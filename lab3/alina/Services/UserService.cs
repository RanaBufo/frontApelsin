using alina.BD;
using alina.DataBase;
using alina.Model;

namespace alina.Services
{
    public class UserService
    {
        private readonly ApplicationContext _db;
        public UserService(ApplicationContext db) => (_db) = (db);

        public void AddUserService(UseresRequestModel newUser)
        {
            var user = new UserDB
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Patronymic = newUser.Patronymic,
                Description = newUser.Description,
                Birthday = newUser.Birhday,
                Contact = new ContactDB
                {
                    Email = newUser.Contact.Email,
                    Password = newUser.Contact.Password,
                    Phone = newUser.Contact.Phone,
                    IdRole = newUser.Contact.IdRole
                }
            };
            _db.Users.Add(user);
            _db.SaveChanges();
        }

        public List<UserDB> GetUsersService()
        {
            var users = _db.Users
                .Join(_db.Contacts,
                u => u.Id,
                c => c.IdUser,
                (u, c) => new UserDB
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Patronymic = u.Patronymic,
                    Description = u.Description,
                    Birthday = u.Birthday,
                    Contact = new ContactDB
                    {
                        Email = c.Email,
                        Password = c.Password,
                        Phone = c.Phone
                    }
                }).ToList();
            return users;
        }

        public UserDB GetUserService(int id)
        {
            var user = _db.Users
                .Join(_db.Contacts,
                u => u.Id,
                c => c.IdUser,
                (u, c) => new UserDB
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Patronymic = u.Patronymic,
                    Description = u.Description,
                    Birthday = u.Birthday,
                    Contact = new ContactDB
                    {
                        Email = c.Email,
                        Password = c.Password,
                        Phone = c.Phone
                    }
                }).FirstOrDefault(j => j.Id == id);
            return user;
        }

    }
}
