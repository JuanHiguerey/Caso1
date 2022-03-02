using EFCache;
using System;
using System.Threading;

namespace net
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Conexion con pooling desactivado para el query 1
            Database db1 = new Database("Server=DESKTOP-9127RRA\\MSSQL;Database=Caso1;User Id=sa;Password=mssql;Pooling=False;");

            // Conexion con pooling habilitado para el query 2
            Database db2 = new Database("Server=DESKTOP-9127RRA\\MSSQL;Database=Caso1;User Id=sa;Password=mssql;");

            // Query3 usando Entity Framework con cache habilitado
            EntityFrameworkCache.Initialize(new InMemoryCache());
            Query3 query3 = new Query3();

            string[] cantons = 
                { "Fteliá", "Abovyan", "Sardoal", "Jungkat Selatan", "Margara", "Matsue-shi", "Pisan", "Amargosa", "Furukawa", "Elmira"};

            for(int i = 0; i < cantons.Length; i++)
            {
                Thread thread = new Thread(() => db1.ExecuteQuery1(cantons[i]));
                thread.Start();
                thread.Join();
            }

            for (int i = 0; i < 10; i++)
            {
                Thread thread = new Thread(() => db2.ExecuteQuery2());
                thread.Start();
                thread.Join();
            }

            for (int i = 0; i < 10; i++)
            {
                Thread thread = new Thread(() => query3.ExecuteQuery3());
                thread.Start();
                thread.Join();
            }


            Console.WriteLine("Query 1 Time: " + db1.GetTotalQueryTime() + " ms");
            Console.WriteLine("Query 2 Time: " + db2.GetTotalQueryTime() + " ms");
            Console.WriteLine("Query 3 Time: " + query3.GetTotalQueryTime() + " ms");

            Console.ReadKey();
        }
    }
}