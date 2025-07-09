using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.PagingModel
{
    public class ListPagingModel<T> where T : class
    {
        public IEnumerable<T> Items { get; }
        public int PageCount { get; }
        public int ItemCount { get; }
        public int PageSize { get; }
        public int PageNumber { get; }

        public ListPagingModel(IEnumerable<T> items, int pageNumber, int pageSize)
        {
            this.ItemCount = items.Count();
            this.PageSize = pageSize;
            this.PageNumber = pageNumber;
            this.PageCount = (int)Math.Ceiling(this.ItemCount * 1.0 / this.PageSize);

            if (this.PageNumber > this.PageCount || this.PageNumber <= 0)
            {
                this.PageNumber = 1;
            }

            this.Items = items.Skip((this.PageNumber - 1) * this.PageSize).Take(this.PageSize);
        }
    }
}
