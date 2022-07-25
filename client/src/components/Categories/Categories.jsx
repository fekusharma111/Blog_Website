import React from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { category } from "../../constants/data";
import { styled } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Categories = () => {
  const [searchParams] = useSearchParams();
  const Category = searchParams.get("category");
  return (
    <>
      <Link
        to={`/create?category=${Category || ""}  `}
        style={{ textDecoration: "none" }}
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledLink to={"/"}>
              <TableCell>All categories</TableCell>
            </StyledLink>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((category) => (
            <TableRow key={category.id}>
              <StyledLink to={`/?category=${category.type}`}>
                <TableCell>{category.type}</TableCell>
              </StyledLink>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
