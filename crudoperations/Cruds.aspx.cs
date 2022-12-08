using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FireSharp;
using FireSharp.Config;
using FireSharp.Response;
using FireSharp.Interfaces;
using System.Web.Services;
using Newtonsoft.Json;

namespace crudoperations
{

    public partial class Cruds : System.Web.UI.Page
    {
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "E6z0J4rnmbF7Ch9pjCUbUcAOOcGAgrhO3aqAu1CX",
            BasePath = "https://cruds-60be4-default-rtdb.firebaseio.com/"
        };
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["SessionConfig"] = config;
        }


        [WebMethod]
        public static string SaveUser(string pGuid, string pName, string pLastName, int pType)
        {
            IFirebaseConfig configsession = HttpContext.Current.Session["SessionConfig"] as IFirebaseConfig;
            try
            {
                IFirebaseClient client;
                client = new FirebaseClient(configsession);

                Entity.Users users = new Entity.Users()
                {
                    Id = pGuid == "" ? Guid.NewGuid().ToString() : pGuid,
                    Name = pName,
                    LastName = pLastName
                };

                if (pType == 0)
                {
                    var inserter = client.Set("Users/" + users.Id, users);
                    return JsonConvert.SerializeObject(inserter.StatusCode.ToString());
                }
                else
                {
                    var inserter = client.Update("Users/" + users.Id, users);
                    return JsonConvert.SerializeObject(inserter.StatusCode.ToString());
                }


            }
            catch (Exception ex)
            {
                //log insert
                return "";
            }

        }

        [WebMethod]
        public static string GetUsers()
        {
            IFirebaseConfig configsession = HttpContext.Current.Session["SessionConfig"] as IFirebaseConfig;
            List<Entity.Users> list = new List<Entity.Users>();
            try
            {
                IFirebaseClient client;
                client = new FirebaseClient(configsession);
                FirebaseResponse result = client.Get("Users");
                Dictionary<string, Entity.Users> datas = JsonConvert.DeserializeObject<Dictionary<string, Entity.Users>>(result.Body);
                if (datas != null)
                {
                    foreach (var item in datas)
                    {
                        list.Add(item.Value);
                    }
                }
                else
                    list = new List<Entity.Users>();

                return JsonConvert.SerializeObject(list.OrderBy(x => x.Name));
            }
            catch (Exception ex)
            {
                //log insert
                return "";
            }

        }

        [WebMethod]
        public static string GetUserItem(string id)
        {
            IFirebaseConfig configsession = HttpContext.Current.Session["SessionConfig"] as IFirebaseConfig;
            try
            {
                IFirebaseClient client;
                client = new FirebaseClient(configsession);
                FirebaseResponse result = client.Get("Users/" + id);
                Entity.Users user = JsonConvert.DeserializeObject<Entity.Users>(result.Body);

                return JsonConvert.SerializeObject(user);
            }
            catch (Exception ex)
            {
                //log insert
                return "";
            }

        }

        [WebMethod]
        public static string DeleteUser(string id)
        {
            IFirebaseConfig configsession = HttpContext.Current.Session["SessionConfig"] as IFirebaseConfig;
            try
            {
                IFirebaseClient client;
                client = new FirebaseClient(configsession);
                var result = client.Delete("Users/" + id);
                return JsonConvert.SerializeObject(result.StatusCode.ToString());
            }
            catch (Exception ex)
            {
                //log insert
                return "";
            }

        }


    }
}