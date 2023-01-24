export function capitalizeFirstLetter(str: string): string {
   // remove all quotes from str
   str = str.replace(/['"]+/g, "");
   // remove back ticks from str
   str = str.replace(/[`]+/g, "");
   console.log(str.charAt(0).toUpperCase() + str.slice(1));
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export const generateNestSchema = (sql: string) => {
   const arr = sql.split(" ");
   let TableName = "";
   let props = "";
   let name = "";
   arr.forEach((e) => {
      if (e.toString().includes("CREATE")) {
         TableName = capitalizeFirstLetter(arr[arr.indexOf(e) + 2]);
      } else if (
         e.toString().includes("char(") ||
         e.toString().includes("text") ||
         e.toString().includes("char")
      ) {
         name = arr[arr.indexOf(e) - 1];
         props += ` 
        @Prop()
        ${name}: string;`;
      } else if (
         e.toString().includes("int(") ||
         e.toString().includes("float")
      ) {
         name = arr[arr.indexOf(e) - 1];
         props += ` 
        @Prop()
        ${name}: number;`;
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
