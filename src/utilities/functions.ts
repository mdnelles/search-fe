import { rand, randNum } from "./gen";

export function capitalizeFirstLetter(str: string): string {
   return removeQuotes(str.charAt(0).toUpperCase() + str.slice(1));
}
export function removeQuotes(str: string): string {
   // remove all quotes from str
   str = str.replace(/['"]+/g, "");
   // remove back ticks from str
   str = str.replace(/[`]+/g, "");
   console.log(str);
   return str;
}
export const getName = (str: string) => {
   // replace single quotes with backticks
   str = str.replace(/['"]+/g, "`");

   const arr = str.split("`");
   return removeQuotes(arr[1]);
};

export const generateNestSchema = (sql: string) => {
   const arr = sql.split("\n");
   let TableName = "";
   let props = "";
   let name = "";
   console.log(arr);
   arr.forEach((e) => {
      console.log(e);
      if (e.toString().includes("CREATE")) {
         TableName = capitalizeFirstLetter(getName(e));
      } else if (
         e.toString().includes("char(") ||
         e.toString().includes("text") ||
         e.toString().includes("char")
      ) {
         name = getName(e);
         props += "\t@Prop()\n\t" + name + ": string;\n\n";
      } else if (
         e.toString().includes("int(") ||
         e.toString().includes("float")
      ) {
         name = getName(e);
         props += "\t@Prop()\n\t" + name + ": number;\n\n";
      }
   });

   return `
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class ${TableName} {
  ${props}

}
export const ${TableName}Schema = SchemaFactory.createForClass(${TableName});`;
};

export const generateNestInterface = (sql: string) => {
   const arr = sql.split("\n");
   let TableName = "";
   let props = "";
   let name = "";
   console.log(arr);
   arr.forEach((e) => {
      console.log(e);
      if (e.toString().includes("CREATE")) {
         TableName = capitalizeFirstLetter(getName(e));
      } else if (
         e.toString().includes("char(") ||
         e.toString().includes("text") ||
         e.toString().includes("char")
      ) {
         name = getName(e);
         props += "\n\treadonly " + name + ": string;";
      } else if (
         e.toString().includes("int(") ||
         e.toString().includes("float")
      ) {
         name = getName(e);
         props += "\n\treadonly " + name + ": number;";
      }
   });

   return `
import { Document } from 'mongoose';
export interface I${TableName} extends Document{${props}
}`;
};

export const generateNestDTO = (sql: string) => {
   const arr = sql.split("\n");
   let TableName = "";
   let props = "";
   let name = "";
   console.log(arr);
   arr.forEach((e) => {
      console.log(e);
      if (e.toString().includes("CREATE")) {
         TableName = capitalizeFirstLetter(getName(e));
      } else if (
         e.toString().includes("char(") ||
         e.toString().includes("text") ||
         e.toString().includes("char")
      ) {
         name = getName(e);
         props +=
            "\n\t@IsString()\n\t@MaxLength(30)\n\t@IsNotEmpty()\n\treadonly " +
            name +
            ": string;\n";
      } else if (
         e.toString().includes("int(") ||
         e.toString().includes("float")
      ) {
         name = getName(e);
         props +=
            "\n\t@IsNumber()\n\t@IsNotEmpty()\n\treadonly " +
            name +
            ": number;\n";
      }
   });

   return `
import { IsNotEmpty, IsNumber, IsString, MaxmarksLength, MaxLength  } from "class-validator";
export class Create${TableName}Dto {${props}
}`;
};

export const generateNestDoc = (sql: string) => {
   const arr = sql.split("\n");
   let props = "";
   let name = "";
   console.log(arr);
   arr.forEach((e) => {
      console.log(e);
      if (e.toString().includes("CREATE")) {
         //TableName = capitalizeFirstLetter(getName(e));
      } else if (
         e.toString().includes("char(") ||
         e.toString().includes("text") ||
         e.toString().includes("char")
      ) {
         name = getName(e);
         props += '\t"' + name + '":"' + rand() + '",\n';
      } else if (
         e.toString().includes("int(") ||
         e.toString().includes("float")
      ) {
         name = getName(e);
         props += '\t"' + name + '":' + randNum(4) + ",\n";
      }
   });

   // remove last two characters from props
   props = props.slice(0, -2);

   return `{
   ${props}
}`;
};

export const sqlToNoSql = (sql: string) => {
   const arr = sql.split(" ");
   let nosql = "";
   arr.forEach((e) => {
      if (e === "SELECT") {
         nosql += "db.";
      } else if (e === "FROM") {
         nosql += ".find({})";
      } else if (e === "WHERE") {
         nosql += ".find({";
      } else if (e === "AND") {
         nosql += ",";
      } else if (e === "OR") {
         nosql += ",";
      } else if (e === "ORDER") {
         nosql += ".sort({";
      } else if (e === "ASC") {
         nosql += ": 1";
      } else if (e === "DESC") {
         nosql += ": -1";
      } else if (e === "LIMIT") {
         nosql += ".limit(";
      } else if (e === "OFFSET") {
         nosql += ".skip(";
      } else if (e === "INSERT") {
         nosql += "db.";
      } else if (e === "INTO") {
         nosql += ".insertOne({";
      } else if (e === "VALUES") {
         nosql += "})";
      } else if (e === "UPDATE") {
         nosql += "db.";
      } else if (e === "SET") {
         nosql += ".updateOne({";
      } else if (e === "DELETE") {
         nosql += "db.";
      } else if (e === "IN") {
         nosql += ".deleteMany({";
      } else if (e === "LIKE") {
         nosql += ": /";
      } else if (e === "NOT") {
         nosql += "!";
      } else if (e === "NULL") {
         nosql += "null";
      } else if (e === "TRUE") {
         nosql += "true";
      } else if (e === "FALSE") {
         nosql += "false";
      } else if (e === "COUNT") {
         nosql += "db.";
      } else if (e === "SUM") {
         nosql += "db.";
      } else if (e === "AVG") {
         nosql += "db.";
      } else if (e === "MIN") {
         nosql += "db.";
      } else if (e === "MAX") {
         nosql += "db.";
      } else if (e === "GROUP") {
         nosql += ".aggregate([";
      } else if (e === "BY") {
         nosql += "},";
      } else if (e === "HAVING") {
         nosql += "},";
      } else if (e === "CREATE") {
         nosql += "db.";
      } else if (e === "TABLE") {
         nosql += ".createCollection(";
      } else if (e === "DROP") {
         nosql += "db.";
      } else if (e === "TRUNCATE") {
         nosql += ".drop()";
      } else if (e === "ALTER") {
         nosql += "db.";
      } else if (e === "ADD") {
         nosql += ".updateOne({";
      } else if (e === "COLUMN") {
         nosql += "},";
      } else if (e === "PRIMARY") {
         nosql += "},";
      } else if (e === "KEY") {
         nosql += "},";
      } else if (e === "FOREIGN") {
         nosql += "},";
      } else if (e === "REFERENCES") {
         nosql += "},";
      } else if (e === "UNIQUE") {
         nosql += "},";
      } else if (e === "INDEX") {
         nosql += "},";
      } else if (e === "ON") {
         nosql += "},";
      } else if (e === "RENAME") {
         nosql += "},";
      } else if (e === "TO") {
         nosql += "},";
      } else if (e === "DATABASE") {
         nosql += "},";
      } else if (e === "GRANT") {
         nosql += "},";
      } else if (e === "REVOKE") {
         nosql += "},";
      } else if (e === "ALL") {
         nosql += "},";
      } else if (e === "PRIVILEGES") {
         nosql += "},";
      } else if (e === "WITH") {
         nosql += "},";
      } else {
         nosql += e;
      }
   });
   return nosql;
};
