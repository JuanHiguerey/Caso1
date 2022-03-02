using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace net
{
    internal class Query3
    {
        private Stopwatch sw;

        public Query3()
        {
            this.sw = new Stopwatch();
        }
        public void ExecuteQuery3()
        {
            using (var context = new Entities())
            {

                sw.Start();
                var query3Min = context.query3_min();
                var query3Max = context.query3_max();
                sw.Stop();

                foreach (var sp in query3Min)
                {
                    Console.WriteLine
                    (
                        "Party ID: " + sp.party_id + " | " +
                        "Plan ID: " + sp.plan_id + " | " +
                        "Canton ID: " + sp.canton_id + " | " +
                        "Min Count: " + sp.count
                    );
                }

                foreach (var sp in query3Max)
                {
                    Console.WriteLine
                    (
                        "Party ID: " + sp.party_id + " | " +
                        "Plan ID: " + sp.plan_id + " | " +
                        "Canton ID: " + sp.canton_id + " | " +
                        "Max Count: " + sp.count
                    );
                }
            }
        }

        public long GetTotalQueryTime()
        {
            return sw.ElapsedMilliseconds;
        }
    }
}
