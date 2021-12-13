using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.Abstraction
{
    public interface IAddressManager
    {
        Task<Address> CreateAddressAsync(Address addressToAdd);
        Address GetAddressByUserId(string userId);
        Task<bool> DeleteAddressAsync(Address addressToDelete);
    }
}
