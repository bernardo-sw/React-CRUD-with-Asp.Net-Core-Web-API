namespace WebAPI.Services
{
    public interface IAuthenticate
    {
        Task<bool> Authenticate(string email, string password);
        Task<bool> RegisterUser(string name, string email, string password);
        Task Logout();
    }
}
