using System;
using System.Data.SqlClient;
using System.Diagnostics;

namespace net
{
    internal class Database
    {
        private string connectionString;
        private Stopwatch sw;

        public Database(string connectionString)
        {
            this.connectionString = connectionString;
            this.sw = new Stopwatch();
        }

        public void ExecuteQuery1(string canton)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "EXECUTE query1 " + "'" + canton + "'";

                    sw.Start();

                    SqlDataReader dr = cmd.ExecuteReader();

                    sw.Stop();

                    while (dr.Read())
                    {
                        Console.WriteLine
                        (
                            "Party: " + dr["name"].ToString() + " | " +
                            "Plan ID: " + dr["plan_id"].ToString() + " | " +
                            "Action ID: " + dr["action_id"].ToString() + " | " +
                            "KPI Type: " + dr["kpi_type"].ToString() + " | " +
                            "KPI Value: " + dr["kpi_value"].ToString() + " | "
                        );
                    }
                    dr.Close();
                }

                conn.Close();
            }
        }

        public void ExecuteQuery2()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = 
                        "SELECT DISTINCT Q.canton_id, " +
                        "COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count " +
                        "FROM ( SELECT canton_id, party_count FROM ( SELECT DISTINCT canton_id, " +
                        "COUNT(*) OVER(PARTITION BY canton_id) party_count FROM ( " +
                        "SELECT DISTINCT canton_id, party_id FROM Deliverables JOIN Plans ON Plans.id = Deliverables.plan_id " +
                        ") Q ) Q GROUP BY canton_id, party_count HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) ) Q " +
                        "JOIN Deliverables ON Q.canton_id = Deliverables.canton_id;";

                    sw.Start();

                    SqlDataReader dr = cmd.ExecuteReader();

                    sw.Stop();

                    while (dr.Read())
                    {
                        Console.WriteLine
                        (
                            "Canton ID: " + dr["canton_id"].ToString() + " | " +
                            "Count: " + dr["deliverable_count"].ToString()
                        );
                    }
                    dr.Close();
                }

                conn.Close();
            }
        }
        public long GetTotalQueryTime()
        {
            return sw.ElapsedMilliseconds;
        }
    }
}
