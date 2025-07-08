using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.ViewModel.ErrorModel
{
    public class InputErrorModel
    {
        public InputErrorModel(string fieldName, string errorMessage)
        {
            FieldName = fieldName;
            ErrorMessage = errorMessage;
        }
        public string FieldName { get; set; }
        public string ErrorMessage { get; set; }
    }
}
