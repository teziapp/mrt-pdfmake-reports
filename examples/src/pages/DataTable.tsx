import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { DynamicTable } from "../../../src/components/DynamicTable";

export default function TablePage() {
  const [data, setData] = useState<Record<string, string | number>[]>([
    { id: 1, name: "John Doe", age: 28, city: "New York", salary: 85000, department: "Engineering" },
    { id: 2, name: "Jane Smith", age: 32, city: "San Francisco", salary: 92000, department: "Marketing" },
    { id: 3, name: "Robert Johnson", age: 35, city: "Chicago", salary: 78000, department: "Finance" },
    { id: 4, name: "Emily Williams", age: 27, city: "Boston", salary: 72000, department: "HR" },
    { id: 5, name: "Michael Brown", age: 41, city: "Seattle", salary: 115000, department: "Engineering" },
    { id: 6, name: "Sarah Miller", age: 29, city: "Austin", salary: 88000, department: "Product" },
    { id: 7, name: "David Garcia", age: 33, city: "Denver", salary: 95000, department: "Engineering" },
    { id: 8, name: "Lisa Rodriguez", age: 38, city: "Miami", salary: 82000, department: "Marketing" },
    { id: 9, name: "Thomas Wilson", age: 45, city: "Portland", salary: 105000, department: "Finance" },
    { id: 10, name: "Jennifer Martinez", age: 31, city: "Los Angeles", salary: 91000, department: "Product" },
  ]);
    
  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <Container 
      sx={{ 
        width: "100%", 
        height: "100vh", 
        m: 0, 
        p: 0, 
        maxWidth: "none" 
      }}
    >
      {data.length > 0 ? (
        <DynamicTable data={data} />
      ) : (
        <Typography variant="body1" align="center">
          No data available. Please upload data.
        </Typography>
      )}
    </Container>
  );
}