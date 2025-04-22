import {
  DeleteItemCommand,
  DynamoDBClient,
  DynamoDBClientConfig,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

interface QueryParams {
  indexName?: string;
  keyConditionExpression: string;
  expressionAttributeValues: Record<string, any>;
  expressionAttributeNames?: Record<string, string>;
  limit?: number;
  scanIndexForward?: boolean;
}

class DynamoDBService {
  private readonly client: DynamoDBClient;

  constructor() {
    const clientConfig: DynamoDBClientConfig = {
      region: process.env.REACT_APP_AWS_REGION ?? "",
      endpoint: process.env.REACT_APP_DYNAMODB_ENDPOINT ?? "",
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID ?? "local",
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ?? "local",
      },
    };

    this.client = new DynamoDBClient(clientConfig);
  }

  /**
   * Escanea todos los elementos de una tabla
   * @param tableName Nombre de la tabla
   * @param limit Límite de elementos a devolver
   * @returns Lista de elementos
   */
  public async scanTable(tableName: string, limit?: number): Promise<Record<string, any>[]> {
    try {
      const command = new ScanCommand({
        TableName: tableName,
        Limit: limit,
      });

      const response = await this.client.send(command);
      return response.Items?.map((item) => unmarshall(item)) || [];
    } catch (error) {
      console.error("Error scanning table:", error);
      throw error;
    }
  }

  /**
   * Obtiene un elemento por su clave primaria
   * @param tableName Nombre de la tabla
   * @param key Clave primaria del elemento
   * @returns El elemento encontrado o null
   */
  public async getItem(tableName: string, key: Record<string, any>): Promise<Record<string, any> | null> {
    try {
      const command = new GetItemCommand({
        TableName: tableName,
        Key: marshall(key),
      });

      const response = await this.client.send(command);
      return response.Item ? unmarshall(response.Item) : null;
    } catch (error) {
      console.error("Error getting item:", error);
      throw error;
    }
  }

  /**
   * Inserta un nuevo elemento en la tabla
   * @param tableName Nombre de la tabla
   * @param item Elemento a insertar
   * @returns Resultado de la operación
   */
  public async putItem(tableName: string, item: Record<string, any>): Promise<boolean> {
    try {
      const command = new PutItemCommand({
        TableName: tableName,
        Item: marshall(item),
      });

      await this.client.send(command);
      return true;
    } catch (error) {
      console.error("Error putting item:", error);
      throw error;
    }
  }

  /**
   * Actualiza un elemento existente
   * @param tableName Nombre de la tabla
   * @param key Clave primaria del elemento
   * @param updateExpression Expresión de actualización
   * @param expressionAttributeValues Valores para la expresión
   * @param expressionAttributeNames Nombres para la expresión
   * @returns El elemento actualizado
   */
  public async updateItem(
    tableName: string,
    key: Record<string, any>,
    updateExpression: string,
    expressionAttributeValues: Record<string, any>,
    expressionAttributeNames?: Record<string, string>
  ): Promise<Record<string, any> | null> {
    try {
      const command = new UpdateItemCommand({
        TableName: tableName,
        Key: marshall(key),
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: marshall(expressionAttributeValues),
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: "ALL_NEW",
      });

      const response = await this.client.send(command);
      return response.Attributes ? unmarshall(response.Attributes) : null;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  /**
   * Elimina un elemento de la tabla
   * @param tableName Nombre de la tabla
   * @param key Clave primaria del elemento
   * @returns Resultado de la operación
   */
  public async deleteItem(tableName: string, key: Record<string, any>): Promise<boolean> {
    console.log("Deleting item with key:", marshall(key));
    try {
      const command = new DeleteItemCommand({
        TableName: tableName,
        Key: marshall(key),
      });

      await this.client.send(command);
      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }

  /**
   * Realiza una consulta a un índice o a la tabla principal
   * @param tableName Nombre de la tabla
   * @param params Parámetros de la consulta
   * @returns Lista de elementos que coinciden con la consulta
   */
  public async query(tableName: string, params: QueryParams): Promise<Record<string, any>[]> {
    try {
      const command = new QueryCommand({
        TableName: tableName,
        IndexName: params.indexName,
        KeyConditionExpression: params.keyConditionExpression,
        ExpressionAttributeValues: marshall(params.expressionAttributeValues),
        ExpressionAttributeNames: params.expressionAttributeNames,
        Limit: params.limit,
        ScanIndexForward: params.scanIndexForward,
      });

      const response = await this.client.send(command);
      return response.Items?.map((item) => unmarshall(item)) || [];
    } catch (error) {
      console.error("Error querying items:", error);
      throw error;
    }
  }
}

export const dynamoDBService: DynamoDBService = new DynamoDBService();
