using Repeet.Models;

namespace Repeet.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(User user);
    }
}