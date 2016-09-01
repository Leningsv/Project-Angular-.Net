using Project.Model.Model.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Project.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PersonController : ApiController
    {
        ProjectEntities db = new ProjectEntities();
        // GET: api/Person
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            var people = db.Person.OrderByDescending(item => item.id).ToList();       
            return people;
        }

        // GET: api/Person/5
        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            var person = db.Person.Where(item => item.id == id).FirstOrDefault();
            return Ok(person);
        }

        // POST: api/Person
        [HttpPost]
        public IHttpActionResult UpdatePerson(Person person)
        {
            db.Entry(person).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Ok(db.Entry(person).State);
        }
        [HttpPost]
        public IHttpActionResult InsertPerson(Person person)
        {
            db.Entry(person).State = System.Data.Entity.EntityState.Added;
            db.SaveChanges();
            return Ok(db.Entry(person).State);
        }
        [HttpPost]
        public IHttpActionResult DeletePerson(Person person)
        {
            db.Entry(person).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
            return Ok(db.Entry(person).State);
        }
    }
}
