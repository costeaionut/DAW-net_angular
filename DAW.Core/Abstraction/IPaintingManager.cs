using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.Abstraction
{
    public interface IPaintingManager
    {
        Task<Painting> CreatePaintingAsync(Painting painting);
        IEnumerable<Painting> GetPaintingsByPainter(string painterId);
        public Painting GetPaintingById(Guid paintingId);
        Task<Painting> UpdatePaintingAsync(Painting paintingToBeUpdated);
        Task<bool> DeletePainting(Painting paintingToBeDeleted);
    }
}
