using DAW.Core.Abstraction;
using DAW.Core.BusinessObject;
using DAW.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data.Managers
{
    public class PaintingManager : IPaintingManager
    {
        private readonly RepositoryContext _context;
        
        public PaintingManager(RepositoryContext context)
        {
            _context = context;
        }

        public async Task<Painting> CreatePaintingAsync(Painting painting)
        {
            var res = await _context.Paintings.AddAsync(painting);
            await _context.SaveChangesAsync();
            
            return res.Entity;
        }
        
        public IEnumerable<Painting> GetPaintingsByPainter(string painterId)
        {
            try
            {
                var paintings = _context.Paintings.Where(p => p.PainterId == painterId).ToList();
                
                return paintings;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Painting GetPaintingById(Guid paintingId)
        {
            try
            {
                return _context.Paintings.FirstOrDefault(p => p.Id == paintingId);
            }
            catch (Exception)
            {
                return null;
            }
        }
    
        public async Task<Painting> UpdatePaintingAsync(Painting paintingToBeUpdated)
        {
            var oldPainting = _context.Paintings.FirstOrDefault(p => p.Id == paintingToBeUpdated.Id);

            if (oldPainting == null)
                return null;

            oldPainting.Name = paintingToBeUpdated.Name;
            oldPainting.PainterId = paintingToBeUpdated.PainterId;
            oldPainting.Description = paintingToBeUpdated.Description;
            oldPainting.CreationDate = paintingToBeUpdated.CreationDate;
            oldPainting.ImageLink = paintingToBeUpdated.ImageLink;
            oldPainting.Price = paintingToBeUpdated.Price;

            try
            {
                await _context.SaveChangesAsync();
                return oldPainting;
            }
            catch (Exception)
            {
                return null;
            }
        }
    
        public async Task<bool> DeletePainting(Painting paintingToBeDeleted)
        {
            try
            {
                _context.Paintings.Remove(paintingToBeDeleted);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<Painting> GetAllPaintings()
            => _context.Paintings.ToList();
    }
}
