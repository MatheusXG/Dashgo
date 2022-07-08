import { createServer, Factory, Model, Response, ActiveModelSerializer, Server } from "miragejs";
import faker from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function MakeServer() {
  const server = createServer({
    
    serializers : {
      application: ActiveModelSerializer
    },
    models: { 
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number){
          return `User ${i + 1}`;
        },
        email(){
          return faker.internet.email().toLowerCase();
        },
        created_at(){
          return faker.date.recent(10);
        }
      })
    },

    routes() {
      this.passthrough('http://localhost:3333/**');
      this.urlPrefix = 'http://localhost:3333'


      this.namespace = 'api';
      this.timing = 750;

      this.get("/users", function (schema, req) {
        const { page = 1, per_page = 10} = req.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users
          .slice(pageStart, pageEnd)

        return new Response(
          200, 
          { 'x-total-count': String(total) },
          { users }
      
        )
      });
      
      this.get("/users/:id");

      this.post("/users");

      this.namespace = '';
      this.passthrough();


    },

    seeds(server) {
      server.createList("user", 200);
    },


  });

 
  return server;
  
}




