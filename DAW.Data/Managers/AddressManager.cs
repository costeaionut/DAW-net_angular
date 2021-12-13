using DAW.Core.Abstraction;
using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data.Managers
{
    public class AddressManager : IAddressManager
    {
        private readonly RepositoryContext _context;

        public AddressManager(RepositoryContext context)
        {
            _context = context;
        }

        public async Task<Address> CreateAddressAsync(Address addressToAdd)
        {
            var newAddress = await _context.Addresses.AddAsync(addressToAdd);
            await _context.SaveChangesAsync();

            return newAddress.Entity;
        }

        public Address GetAddressByUserId(string userId)
        {
            var address = _context.Addresses.FirstOrDefault(a => a.UserId == userId);

            return address;
        }

        public async Task<bool> DeleteAddressAsync(Address addressToDelete)
        {
            _context.Addresses.Remove(addressToDelete);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
