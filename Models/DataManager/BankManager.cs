using CustomersServerSide.Models;
using Newtonsoft.Json;
using ServerSide.Models.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

namespace ServerSide.Models.DataManager
{
    public class BankManager : IBankRepository
    {
        private Dictionary<int, Bank> _banks = null;

        public BankManager()
        {
        }

        private void FillData()
        {
            try
            {
                var webRequest = WebRequest.Create("https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation") as HttpWebRequest;

                webRequest.ContentType = "application/json";
                webRequest.UserAgent = "Nothing";

                using (var s = webRequest.GetResponse().GetResponseStream())
                {
                    using (var sr = new StreamReader(s))
                    {
                        var dataAsJson = sr.ReadToEnd();
                        var bankDataApiResult = JsonConvert.DeserializeObject<BankDataApiResult>(dataAsJson);
                        var banks = bankDataApiResult.Data.Banks;
                        var branches = bankDataApiResult.Data.BankBranches;

                        _banks = new Dictionary<int, Bank>();
                        foreach (var bank in banks)
                        {
                            _banks.Add(bank.Code, bank);
                        }

                        foreach (var branch in branches)
                        {
                            if (_banks.ContainsKey(branch.BankCode))
                                _banks[branch.BankCode].Branches.Add(branch);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Bank> GetAll()
        {
            FillData();

            return _banks.Select(x => x.Value).ToList();
        }

        public bool IsValid(int bankNumber, int branchNumber)
        {
            try
            {
                FillData();

                return _banks.TryGetValue(bankNumber, out Bank bank) &&
                    bank.Status &&
                    bank.Branches.Any(x => x.BranchNumber == branchNumber);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
