
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Realisations
 * 
 */
export type Realisations = $Result.DefaultSelection<Prisma.$RealisationsPayload>
/**
 * Model RealisationImage
 * 
 */
export type RealisationImage = $Result.DefaultSelection<Prisma.$RealisationImagePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model SiteImage
 * 
 */
export type SiteImage = $Result.DefaultSelection<Prisma.$SiteImagePayload>
/**
 * Model admin
 * 
 */
export type admin = $Result.DefaultSelection<Prisma.$adminPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Realisations
 * const realisations = await prisma.realisations.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Realisations
   * const realisations = await prisma.realisations.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.realisations`: Exposes CRUD operations for the **Realisations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Realisations
    * const realisations = await prisma.realisations.findMany()
    * ```
    */
  get realisations(): Prisma.RealisationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.realisationImage`: Exposes CRUD operations for the **RealisationImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RealisationImages
    * const realisationImages = await prisma.realisationImage.findMany()
    * ```
    */
  get realisationImage(): Prisma.RealisationImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteImage`: Exposes CRUD operations for the **SiteImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteImages
    * const siteImages = await prisma.siteImage.findMany()
    * ```
    */
  get siteImage(): Prisma.SiteImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.adminDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Realisations: 'Realisations',
    RealisationImage: 'RealisationImage',
    Category: 'Category',
    Tag: 'Tag',
    SiteImage: 'SiteImage',
    admin: 'admin'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "realisations" | "realisationImage" | "category" | "tag" | "siteImage" | "admin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Realisations: {
        payload: Prisma.$RealisationsPayload<ExtArgs>
        fields: Prisma.RealisationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RealisationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RealisationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>
          }
          findFirst: {
            args: Prisma.RealisationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RealisationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>
          }
          findMany: {
            args: Prisma.RealisationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>[]
          }
          create: {
            args: Prisma.RealisationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>
          }
          createMany: {
            args: Prisma.RealisationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RealisationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>[]
          }
          delete: {
            args: Prisma.RealisationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>
          }
          update: {
            args: Prisma.RealisationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>
          }
          deleteMany: {
            args: Prisma.RealisationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RealisationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RealisationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>[]
          }
          upsert: {
            args: Prisma.RealisationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationsPayload>
          }
          aggregate: {
            args: Prisma.RealisationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRealisations>
          }
          groupBy: {
            args: Prisma.RealisationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RealisationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RealisationsCountArgs<ExtArgs>
            result: $Utils.Optional<RealisationsCountAggregateOutputType> | number
          }
        }
      }
      RealisationImage: {
        payload: Prisma.$RealisationImagePayload<ExtArgs>
        fields: Prisma.RealisationImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RealisationImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RealisationImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>
          }
          findFirst: {
            args: Prisma.RealisationImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RealisationImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>
          }
          findMany: {
            args: Prisma.RealisationImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>[]
          }
          create: {
            args: Prisma.RealisationImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>
          }
          createMany: {
            args: Prisma.RealisationImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RealisationImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>[]
          }
          delete: {
            args: Prisma.RealisationImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>
          }
          update: {
            args: Prisma.RealisationImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>
          }
          deleteMany: {
            args: Prisma.RealisationImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RealisationImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RealisationImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>[]
          }
          upsert: {
            args: Prisma.RealisationImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealisationImagePayload>
          }
          aggregate: {
            args: Prisma.RealisationImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRealisationImage>
          }
          groupBy: {
            args: Prisma.RealisationImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<RealisationImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.RealisationImageCountArgs<ExtArgs>
            result: $Utils.Optional<RealisationImageCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      SiteImage: {
        payload: Prisma.$SiteImagePayload<ExtArgs>
        fields: Prisma.SiteImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>
          }
          findFirst: {
            args: Prisma.SiteImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>
          }
          findMany: {
            args: Prisma.SiteImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>[]
          }
          create: {
            args: Prisma.SiteImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>
          }
          createMany: {
            args: Prisma.SiteImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>[]
          }
          delete: {
            args: Prisma.SiteImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>
          }
          update: {
            args: Prisma.SiteImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>
          }
          deleteMany: {
            args: Prisma.SiteImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>[]
          }
          upsert: {
            args: Prisma.SiteImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteImagePayload>
          }
          aggregate: {
            args: Prisma.SiteImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteImage>
          }
          groupBy: {
            args: Prisma.SiteImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteImageCountArgs<ExtArgs>
            result: $Utils.Optional<SiteImageCountAggregateOutputType> | number
          }
        }
      }
      admin: {
        payload: Prisma.$adminPayload<ExtArgs>
        fields: Prisma.adminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findFirst: {
            args: Prisma.adminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findMany: {
            args: Prisma.adminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          create: {
            args: Prisma.adminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          createMany: {
            args: Prisma.adminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.adminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          delete: {
            args: Prisma.adminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          update: {
            args: Prisma.adminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          deleteMany: {
            args: Prisma.adminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.adminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          upsert: {
            args: Prisma.adminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.adminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.adminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    realisations?: RealisationsOmit
    realisationImage?: RealisationImageOmit
    category?: CategoryOmit
    tag?: TagOmit
    siteImage?: SiteImageOmit
    admin?: adminOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RealisationsCountOutputType
   */

  export type RealisationsCountOutputType = {
    images: number
    categories: number
    tags: number
  }

  export type RealisationsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | RealisationsCountOutputTypeCountImagesArgs
    categories?: boolean | RealisationsCountOutputTypeCountCategoriesArgs
    tags?: boolean | RealisationsCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * RealisationsCountOutputType without action
   */
  export type RealisationsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationsCountOutputType
     */
    select?: RealisationsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RealisationsCountOutputType without action
   */
  export type RealisationsCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RealisationImageWhereInput
  }

  /**
   * RealisationsCountOutputType without action
   */
  export type RealisationsCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * RealisationsCountOutputType without action
   */
  export type RealisationsCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    realisations: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisations?: boolean | CategoryCountOutputTypeCountRealisationsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountRealisationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RealisationsWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    realisations: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisations?: boolean | TagCountOutputTypeCountRealisationsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountRealisationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RealisationsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Realisations
   */

  export type AggregateRealisations = {
    _count: RealisationsCountAggregateOutputType | null
    _avg: RealisationsAvgAggregateOutputType | null
    _sum: RealisationsSumAggregateOutputType | null
    _min: RealisationsMinAggregateOutputType | null
    _max: RealisationsMaxAggregateOutputType | null
  }

  export type RealisationsAvgAggregateOutputType = {
    id: number | null
  }

  export type RealisationsSumAggregateOutputType = {
    id: number | null
  }

  export type RealisationsMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    location: string | null
    imageUrl: string | null
    videoUrl: string | null
    youtubeUrl: string | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RealisationsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    location: string | null
    imageUrl: string | null
    videoUrl: string | null
    youtubeUrl: string | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RealisationsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    location: number
    imageUrl: number
    videoUrl: number
    youtubeUrl: number
    link: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RealisationsAvgAggregateInputType = {
    id?: true
  }

  export type RealisationsSumAggregateInputType = {
    id?: true
  }

  export type RealisationsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    imageUrl?: true
    videoUrl?: true
    youtubeUrl?: true
    link?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RealisationsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    imageUrl?: true
    videoUrl?: true
    youtubeUrl?: true
    link?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RealisationsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    imageUrl?: true
    videoUrl?: true
    youtubeUrl?: true
    link?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RealisationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Realisations to aggregate.
     */
    where?: RealisationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realisations to fetch.
     */
    orderBy?: RealisationsOrderByWithRelationInput | RealisationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RealisationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realisations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realisations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Realisations
    **/
    _count?: true | RealisationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RealisationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RealisationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RealisationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RealisationsMaxAggregateInputType
  }

  export type GetRealisationsAggregateType<T extends RealisationsAggregateArgs> = {
        [P in keyof T & keyof AggregateRealisations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRealisations[P]>
      : GetScalarType<T[P], AggregateRealisations[P]>
  }




  export type RealisationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RealisationsWhereInput
    orderBy?: RealisationsOrderByWithAggregationInput | RealisationsOrderByWithAggregationInput[]
    by: RealisationsScalarFieldEnum[] | RealisationsScalarFieldEnum
    having?: RealisationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RealisationsCountAggregateInputType | true
    _avg?: RealisationsAvgAggregateInputType
    _sum?: RealisationsSumAggregateInputType
    _min?: RealisationsMinAggregateInputType
    _max?: RealisationsMaxAggregateInputType
  }

  export type RealisationsGroupByOutputType = {
    id: number
    title: string
    description: string
    location: string | null
    imageUrl: string | null
    videoUrl: string | null
    youtubeUrl: string | null
    link: string | null
    createdAt: Date
    updatedAt: Date
    _count: RealisationsCountAggregateOutputType | null
    _avg: RealisationsAvgAggregateOutputType | null
    _sum: RealisationsSumAggregateOutputType | null
    _min: RealisationsMinAggregateOutputType | null
    _max: RealisationsMaxAggregateOutputType | null
  }

  type GetRealisationsGroupByPayload<T extends RealisationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RealisationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RealisationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RealisationsGroupByOutputType[P]>
            : GetScalarType<T[P], RealisationsGroupByOutputType[P]>
        }
      >
    >


  export type RealisationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    youtubeUrl?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    images?: boolean | Realisations$imagesArgs<ExtArgs>
    categories?: boolean | Realisations$categoriesArgs<ExtArgs>
    tags?: boolean | Realisations$tagsArgs<ExtArgs>
    _count?: boolean | RealisationsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["realisations"]>

  export type RealisationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    youtubeUrl?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["realisations"]>

  export type RealisationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    youtubeUrl?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["realisations"]>

  export type RealisationsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    youtubeUrl?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RealisationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "location" | "imageUrl" | "videoUrl" | "youtubeUrl" | "link" | "createdAt" | "updatedAt", ExtArgs["result"]["realisations"]>
  export type RealisationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Realisations$imagesArgs<ExtArgs>
    categories?: boolean | Realisations$categoriesArgs<ExtArgs>
    tags?: boolean | Realisations$tagsArgs<ExtArgs>
    _count?: boolean | RealisationsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RealisationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RealisationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RealisationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Realisations"
    objects: {
      images: Prisma.$RealisationImagePayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      tags: Prisma.$TagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      location: string | null
      imageUrl: string | null
      videoUrl: string | null
      youtubeUrl: string | null
      link: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["realisations"]>
    composites: {}
  }

  type RealisationsGetPayload<S extends boolean | null | undefined | RealisationsDefaultArgs> = $Result.GetResult<Prisma.$RealisationsPayload, S>

  type RealisationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RealisationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RealisationsCountAggregateInputType | true
    }

  export interface RealisationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Realisations'], meta: { name: 'Realisations' } }
    /**
     * Find zero or one Realisations that matches the filter.
     * @param {RealisationsFindUniqueArgs} args - Arguments to find a Realisations
     * @example
     * // Get one Realisations
     * const realisations = await prisma.realisations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RealisationsFindUniqueArgs>(args: SelectSubset<T, RealisationsFindUniqueArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Realisations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RealisationsFindUniqueOrThrowArgs} args - Arguments to find a Realisations
     * @example
     * // Get one Realisations
     * const realisations = await prisma.realisations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RealisationsFindUniqueOrThrowArgs>(args: SelectSubset<T, RealisationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Realisations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsFindFirstArgs} args - Arguments to find a Realisations
     * @example
     * // Get one Realisations
     * const realisations = await prisma.realisations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RealisationsFindFirstArgs>(args?: SelectSubset<T, RealisationsFindFirstArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Realisations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsFindFirstOrThrowArgs} args - Arguments to find a Realisations
     * @example
     * // Get one Realisations
     * const realisations = await prisma.realisations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RealisationsFindFirstOrThrowArgs>(args?: SelectSubset<T, RealisationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Realisations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Realisations
     * const realisations = await prisma.realisations.findMany()
     * 
     * // Get first 10 Realisations
     * const realisations = await prisma.realisations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const realisationsWithIdOnly = await prisma.realisations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RealisationsFindManyArgs>(args?: SelectSubset<T, RealisationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Realisations.
     * @param {RealisationsCreateArgs} args - Arguments to create a Realisations.
     * @example
     * // Create one Realisations
     * const Realisations = await prisma.realisations.create({
     *   data: {
     *     // ... data to create a Realisations
     *   }
     * })
     * 
     */
    create<T extends RealisationsCreateArgs>(args: SelectSubset<T, RealisationsCreateArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Realisations.
     * @param {RealisationsCreateManyArgs} args - Arguments to create many Realisations.
     * @example
     * // Create many Realisations
     * const realisations = await prisma.realisations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RealisationsCreateManyArgs>(args?: SelectSubset<T, RealisationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Realisations and returns the data saved in the database.
     * @param {RealisationsCreateManyAndReturnArgs} args - Arguments to create many Realisations.
     * @example
     * // Create many Realisations
     * const realisations = await prisma.realisations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Realisations and only return the `id`
     * const realisationsWithIdOnly = await prisma.realisations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RealisationsCreateManyAndReturnArgs>(args?: SelectSubset<T, RealisationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Realisations.
     * @param {RealisationsDeleteArgs} args - Arguments to delete one Realisations.
     * @example
     * // Delete one Realisations
     * const Realisations = await prisma.realisations.delete({
     *   where: {
     *     // ... filter to delete one Realisations
     *   }
     * })
     * 
     */
    delete<T extends RealisationsDeleteArgs>(args: SelectSubset<T, RealisationsDeleteArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Realisations.
     * @param {RealisationsUpdateArgs} args - Arguments to update one Realisations.
     * @example
     * // Update one Realisations
     * const realisations = await prisma.realisations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RealisationsUpdateArgs>(args: SelectSubset<T, RealisationsUpdateArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Realisations.
     * @param {RealisationsDeleteManyArgs} args - Arguments to filter Realisations to delete.
     * @example
     * // Delete a few Realisations
     * const { count } = await prisma.realisations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RealisationsDeleteManyArgs>(args?: SelectSubset<T, RealisationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Realisations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Realisations
     * const realisations = await prisma.realisations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RealisationsUpdateManyArgs>(args: SelectSubset<T, RealisationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Realisations and returns the data updated in the database.
     * @param {RealisationsUpdateManyAndReturnArgs} args - Arguments to update many Realisations.
     * @example
     * // Update many Realisations
     * const realisations = await prisma.realisations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Realisations and only return the `id`
     * const realisationsWithIdOnly = await prisma.realisations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RealisationsUpdateManyAndReturnArgs>(args: SelectSubset<T, RealisationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Realisations.
     * @param {RealisationsUpsertArgs} args - Arguments to update or create a Realisations.
     * @example
     * // Update or create a Realisations
     * const realisations = await prisma.realisations.upsert({
     *   create: {
     *     // ... data to create a Realisations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Realisations we want to update
     *   }
     * })
     */
    upsert<T extends RealisationsUpsertArgs>(args: SelectSubset<T, RealisationsUpsertArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Realisations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsCountArgs} args - Arguments to filter Realisations to count.
     * @example
     * // Count the number of Realisations
     * const count = await prisma.realisations.count({
     *   where: {
     *     // ... the filter for the Realisations we want to count
     *   }
     * })
    **/
    count<T extends RealisationsCountArgs>(
      args?: Subset<T, RealisationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RealisationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Realisations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RealisationsAggregateArgs>(args: Subset<T, RealisationsAggregateArgs>): Prisma.PrismaPromise<GetRealisationsAggregateType<T>>

    /**
     * Group by Realisations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RealisationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RealisationsGroupByArgs['orderBy'] }
        : { orderBy?: RealisationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RealisationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRealisationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Realisations model
   */
  readonly fields: RealisationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Realisations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RealisationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends Realisations$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Realisations$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Realisations$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Realisations$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Realisations$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Realisations$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Realisations model
   */
  interface RealisationsFieldRefs {
    readonly id: FieldRef<"Realisations", 'Int'>
    readonly title: FieldRef<"Realisations", 'String'>
    readonly description: FieldRef<"Realisations", 'String'>
    readonly location: FieldRef<"Realisations", 'String'>
    readonly imageUrl: FieldRef<"Realisations", 'String'>
    readonly videoUrl: FieldRef<"Realisations", 'String'>
    readonly youtubeUrl: FieldRef<"Realisations", 'String'>
    readonly link: FieldRef<"Realisations", 'String'>
    readonly createdAt: FieldRef<"Realisations", 'DateTime'>
    readonly updatedAt: FieldRef<"Realisations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Realisations findUnique
   */
  export type RealisationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * Filter, which Realisations to fetch.
     */
    where: RealisationsWhereUniqueInput
  }

  /**
   * Realisations findUniqueOrThrow
   */
  export type RealisationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * Filter, which Realisations to fetch.
     */
    where: RealisationsWhereUniqueInput
  }

  /**
   * Realisations findFirst
   */
  export type RealisationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * Filter, which Realisations to fetch.
     */
    where?: RealisationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realisations to fetch.
     */
    orderBy?: RealisationsOrderByWithRelationInput | RealisationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Realisations.
     */
    cursor?: RealisationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realisations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realisations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Realisations.
     */
    distinct?: RealisationsScalarFieldEnum | RealisationsScalarFieldEnum[]
  }

  /**
   * Realisations findFirstOrThrow
   */
  export type RealisationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * Filter, which Realisations to fetch.
     */
    where?: RealisationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realisations to fetch.
     */
    orderBy?: RealisationsOrderByWithRelationInput | RealisationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Realisations.
     */
    cursor?: RealisationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realisations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realisations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Realisations.
     */
    distinct?: RealisationsScalarFieldEnum | RealisationsScalarFieldEnum[]
  }

  /**
   * Realisations findMany
   */
  export type RealisationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * Filter, which Realisations to fetch.
     */
    where?: RealisationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realisations to fetch.
     */
    orderBy?: RealisationsOrderByWithRelationInput | RealisationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Realisations.
     */
    cursor?: RealisationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realisations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realisations.
     */
    skip?: number
    distinct?: RealisationsScalarFieldEnum | RealisationsScalarFieldEnum[]
  }

  /**
   * Realisations create
   */
  export type RealisationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * The data needed to create a Realisations.
     */
    data: XOR<RealisationsCreateInput, RealisationsUncheckedCreateInput>
  }

  /**
   * Realisations createMany
   */
  export type RealisationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Realisations.
     */
    data: RealisationsCreateManyInput | RealisationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Realisations createManyAndReturn
   */
  export type RealisationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * The data used to create many Realisations.
     */
    data: RealisationsCreateManyInput | RealisationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Realisations update
   */
  export type RealisationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * The data needed to update a Realisations.
     */
    data: XOR<RealisationsUpdateInput, RealisationsUncheckedUpdateInput>
    /**
     * Choose, which Realisations to update.
     */
    where: RealisationsWhereUniqueInput
  }

  /**
   * Realisations updateMany
   */
  export type RealisationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Realisations.
     */
    data: XOR<RealisationsUpdateManyMutationInput, RealisationsUncheckedUpdateManyInput>
    /**
     * Filter which Realisations to update
     */
    where?: RealisationsWhereInput
    /**
     * Limit how many Realisations to update.
     */
    limit?: number
  }

  /**
   * Realisations updateManyAndReturn
   */
  export type RealisationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * The data used to update Realisations.
     */
    data: XOR<RealisationsUpdateManyMutationInput, RealisationsUncheckedUpdateManyInput>
    /**
     * Filter which Realisations to update
     */
    where?: RealisationsWhereInput
    /**
     * Limit how many Realisations to update.
     */
    limit?: number
  }

  /**
   * Realisations upsert
   */
  export type RealisationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * The filter to search for the Realisations to update in case it exists.
     */
    where: RealisationsWhereUniqueInput
    /**
     * In case the Realisations found by the `where` argument doesn't exist, create a new Realisations with this data.
     */
    create: XOR<RealisationsCreateInput, RealisationsUncheckedCreateInput>
    /**
     * In case the Realisations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RealisationsUpdateInput, RealisationsUncheckedUpdateInput>
  }

  /**
   * Realisations delete
   */
  export type RealisationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    /**
     * Filter which Realisations to delete.
     */
    where: RealisationsWhereUniqueInput
  }

  /**
   * Realisations deleteMany
   */
  export type RealisationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Realisations to delete
     */
    where?: RealisationsWhereInput
    /**
     * Limit how many Realisations to delete.
     */
    limit?: number
  }

  /**
   * Realisations.images
   */
  export type Realisations$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    where?: RealisationImageWhereInput
    orderBy?: RealisationImageOrderByWithRelationInput | RealisationImageOrderByWithRelationInput[]
    cursor?: RealisationImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RealisationImageScalarFieldEnum | RealisationImageScalarFieldEnum[]
  }

  /**
   * Realisations.categories
   */
  export type Realisations$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Realisations.tags
   */
  export type Realisations$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Realisations without action
   */
  export type RealisationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
  }


  /**
   * Model RealisationImage
   */

  export type AggregateRealisationImage = {
    _count: RealisationImageCountAggregateOutputType | null
    _avg: RealisationImageAvgAggregateOutputType | null
    _sum: RealisationImageSumAggregateOutputType | null
    _min: RealisationImageMinAggregateOutputType | null
    _max: RealisationImageMaxAggregateOutputType | null
  }

  export type RealisationImageAvgAggregateOutputType = {
    id: number | null
    position: number | null
    realisationId: number | null
  }

  export type RealisationImageSumAggregateOutputType = {
    id: number | null
    position: number | null
    realisationId: number | null
  }

  export type RealisationImageMinAggregateOutputType = {
    id: number | null
    url: string | null
    position: number | null
    realisationId: number | null
  }

  export type RealisationImageMaxAggregateOutputType = {
    id: number | null
    url: string | null
    position: number | null
    realisationId: number | null
  }

  export type RealisationImageCountAggregateOutputType = {
    id: number
    url: number
    position: number
    realisationId: number
    _all: number
  }


  export type RealisationImageAvgAggregateInputType = {
    id?: true
    position?: true
    realisationId?: true
  }

  export type RealisationImageSumAggregateInputType = {
    id?: true
    position?: true
    realisationId?: true
  }

  export type RealisationImageMinAggregateInputType = {
    id?: true
    url?: true
    position?: true
    realisationId?: true
  }

  export type RealisationImageMaxAggregateInputType = {
    id?: true
    url?: true
    position?: true
    realisationId?: true
  }

  export type RealisationImageCountAggregateInputType = {
    id?: true
    url?: true
    position?: true
    realisationId?: true
    _all?: true
  }

  export type RealisationImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RealisationImage to aggregate.
     */
    where?: RealisationImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RealisationImages to fetch.
     */
    orderBy?: RealisationImageOrderByWithRelationInput | RealisationImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RealisationImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RealisationImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RealisationImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RealisationImages
    **/
    _count?: true | RealisationImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RealisationImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RealisationImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RealisationImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RealisationImageMaxAggregateInputType
  }

  export type GetRealisationImageAggregateType<T extends RealisationImageAggregateArgs> = {
        [P in keyof T & keyof AggregateRealisationImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRealisationImage[P]>
      : GetScalarType<T[P], AggregateRealisationImage[P]>
  }




  export type RealisationImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RealisationImageWhereInput
    orderBy?: RealisationImageOrderByWithAggregationInput | RealisationImageOrderByWithAggregationInput[]
    by: RealisationImageScalarFieldEnum[] | RealisationImageScalarFieldEnum
    having?: RealisationImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RealisationImageCountAggregateInputType | true
    _avg?: RealisationImageAvgAggregateInputType
    _sum?: RealisationImageSumAggregateInputType
    _min?: RealisationImageMinAggregateInputType
    _max?: RealisationImageMaxAggregateInputType
  }

  export type RealisationImageGroupByOutputType = {
    id: number
    url: string
    position: number
    realisationId: number
    _count: RealisationImageCountAggregateOutputType | null
    _avg: RealisationImageAvgAggregateOutputType | null
    _sum: RealisationImageSumAggregateOutputType | null
    _min: RealisationImageMinAggregateOutputType | null
    _max: RealisationImageMaxAggregateOutputType | null
  }

  type GetRealisationImageGroupByPayload<T extends RealisationImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RealisationImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RealisationImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RealisationImageGroupByOutputType[P]>
            : GetScalarType<T[P], RealisationImageGroupByOutputType[P]>
        }
      >
    >


  export type RealisationImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    position?: boolean
    realisationId?: boolean
    realisation?: boolean | RealisationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["realisationImage"]>

  export type RealisationImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    position?: boolean
    realisationId?: boolean
    realisation?: boolean | RealisationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["realisationImage"]>

  export type RealisationImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    position?: boolean
    realisationId?: boolean
    realisation?: boolean | RealisationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["realisationImage"]>

  export type RealisationImageSelectScalar = {
    id?: boolean
    url?: boolean
    position?: boolean
    realisationId?: boolean
  }

  export type RealisationImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "position" | "realisationId", ExtArgs["result"]["realisationImage"]>
  export type RealisationImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisation?: boolean | RealisationsDefaultArgs<ExtArgs>
  }
  export type RealisationImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisation?: boolean | RealisationsDefaultArgs<ExtArgs>
  }
  export type RealisationImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisation?: boolean | RealisationsDefaultArgs<ExtArgs>
  }

  export type $RealisationImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RealisationImage"
    objects: {
      realisation: Prisma.$RealisationsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      position: number
      realisationId: number
    }, ExtArgs["result"]["realisationImage"]>
    composites: {}
  }

  type RealisationImageGetPayload<S extends boolean | null | undefined | RealisationImageDefaultArgs> = $Result.GetResult<Prisma.$RealisationImagePayload, S>

  type RealisationImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RealisationImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RealisationImageCountAggregateInputType | true
    }

  export interface RealisationImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RealisationImage'], meta: { name: 'RealisationImage' } }
    /**
     * Find zero or one RealisationImage that matches the filter.
     * @param {RealisationImageFindUniqueArgs} args - Arguments to find a RealisationImage
     * @example
     * // Get one RealisationImage
     * const realisationImage = await prisma.realisationImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RealisationImageFindUniqueArgs>(args: SelectSubset<T, RealisationImageFindUniqueArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RealisationImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RealisationImageFindUniqueOrThrowArgs} args - Arguments to find a RealisationImage
     * @example
     * // Get one RealisationImage
     * const realisationImage = await prisma.realisationImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RealisationImageFindUniqueOrThrowArgs>(args: SelectSubset<T, RealisationImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RealisationImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageFindFirstArgs} args - Arguments to find a RealisationImage
     * @example
     * // Get one RealisationImage
     * const realisationImage = await prisma.realisationImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RealisationImageFindFirstArgs>(args?: SelectSubset<T, RealisationImageFindFirstArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RealisationImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageFindFirstOrThrowArgs} args - Arguments to find a RealisationImage
     * @example
     * // Get one RealisationImage
     * const realisationImage = await prisma.realisationImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RealisationImageFindFirstOrThrowArgs>(args?: SelectSubset<T, RealisationImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RealisationImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RealisationImages
     * const realisationImages = await prisma.realisationImage.findMany()
     * 
     * // Get first 10 RealisationImages
     * const realisationImages = await prisma.realisationImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const realisationImageWithIdOnly = await prisma.realisationImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RealisationImageFindManyArgs>(args?: SelectSubset<T, RealisationImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RealisationImage.
     * @param {RealisationImageCreateArgs} args - Arguments to create a RealisationImage.
     * @example
     * // Create one RealisationImage
     * const RealisationImage = await prisma.realisationImage.create({
     *   data: {
     *     // ... data to create a RealisationImage
     *   }
     * })
     * 
     */
    create<T extends RealisationImageCreateArgs>(args: SelectSubset<T, RealisationImageCreateArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RealisationImages.
     * @param {RealisationImageCreateManyArgs} args - Arguments to create many RealisationImages.
     * @example
     * // Create many RealisationImages
     * const realisationImage = await prisma.realisationImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RealisationImageCreateManyArgs>(args?: SelectSubset<T, RealisationImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RealisationImages and returns the data saved in the database.
     * @param {RealisationImageCreateManyAndReturnArgs} args - Arguments to create many RealisationImages.
     * @example
     * // Create many RealisationImages
     * const realisationImage = await prisma.realisationImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RealisationImages and only return the `id`
     * const realisationImageWithIdOnly = await prisma.realisationImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RealisationImageCreateManyAndReturnArgs>(args?: SelectSubset<T, RealisationImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RealisationImage.
     * @param {RealisationImageDeleteArgs} args - Arguments to delete one RealisationImage.
     * @example
     * // Delete one RealisationImage
     * const RealisationImage = await prisma.realisationImage.delete({
     *   where: {
     *     // ... filter to delete one RealisationImage
     *   }
     * })
     * 
     */
    delete<T extends RealisationImageDeleteArgs>(args: SelectSubset<T, RealisationImageDeleteArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RealisationImage.
     * @param {RealisationImageUpdateArgs} args - Arguments to update one RealisationImage.
     * @example
     * // Update one RealisationImage
     * const realisationImage = await prisma.realisationImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RealisationImageUpdateArgs>(args: SelectSubset<T, RealisationImageUpdateArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RealisationImages.
     * @param {RealisationImageDeleteManyArgs} args - Arguments to filter RealisationImages to delete.
     * @example
     * // Delete a few RealisationImages
     * const { count } = await prisma.realisationImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RealisationImageDeleteManyArgs>(args?: SelectSubset<T, RealisationImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RealisationImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RealisationImages
     * const realisationImage = await prisma.realisationImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RealisationImageUpdateManyArgs>(args: SelectSubset<T, RealisationImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RealisationImages and returns the data updated in the database.
     * @param {RealisationImageUpdateManyAndReturnArgs} args - Arguments to update many RealisationImages.
     * @example
     * // Update many RealisationImages
     * const realisationImage = await prisma.realisationImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RealisationImages and only return the `id`
     * const realisationImageWithIdOnly = await prisma.realisationImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RealisationImageUpdateManyAndReturnArgs>(args: SelectSubset<T, RealisationImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RealisationImage.
     * @param {RealisationImageUpsertArgs} args - Arguments to update or create a RealisationImage.
     * @example
     * // Update or create a RealisationImage
     * const realisationImage = await prisma.realisationImage.upsert({
     *   create: {
     *     // ... data to create a RealisationImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RealisationImage we want to update
     *   }
     * })
     */
    upsert<T extends RealisationImageUpsertArgs>(args: SelectSubset<T, RealisationImageUpsertArgs<ExtArgs>>): Prisma__RealisationImageClient<$Result.GetResult<Prisma.$RealisationImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RealisationImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageCountArgs} args - Arguments to filter RealisationImages to count.
     * @example
     * // Count the number of RealisationImages
     * const count = await prisma.realisationImage.count({
     *   where: {
     *     // ... the filter for the RealisationImages we want to count
     *   }
     * })
    **/
    count<T extends RealisationImageCountArgs>(
      args?: Subset<T, RealisationImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RealisationImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RealisationImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RealisationImageAggregateArgs>(args: Subset<T, RealisationImageAggregateArgs>): Prisma.PrismaPromise<GetRealisationImageAggregateType<T>>

    /**
     * Group by RealisationImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealisationImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RealisationImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RealisationImageGroupByArgs['orderBy'] }
        : { orderBy?: RealisationImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RealisationImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRealisationImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RealisationImage model
   */
  readonly fields: RealisationImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RealisationImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RealisationImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    realisation<T extends RealisationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RealisationsDefaultArgs<ExtArgs>>): Prisma__RealisationsClient<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RealisationImage model
   */
  interface RealisationImageFieldRefs {
    readonly id: FieldRef<"RealisationImage", 'Int'>
    readonly url: FieldRef<"RealisationImage", 'String'>
    readonly position: FieldRef<"RealisationImage", 'Int'>
    readonly realisationId: FieldRef<"RealisationImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RealisationImage findUnique
   */
  export type RealisationImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * Filter, which RealisationImage to fetch.
     */
    where: RealisationImageWhereUniqueInput
  }

  /**
   * RealisationImage findUniqueOrThrow
   */
  export type RealisationImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * Filter, which RealisationImage to fetch.
     */
    where: RealisationImageWhereUniqueInput
  }

  /**
   * RealisationImage findFirst
   */
  export type RealisationImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * Filter, which RealisationImage to fetch.
     */
    where?: RealisationImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RealisationImages to fetch.
     */
    orderBy?: RealisationImageOrderByWithRelationInput | RealisationImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RealisationImages.
     */
    cursor?: RealisationImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RealisationImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RealisationImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RealisationImages.
     */
    distinct?: RealisationImageScalarFieldEnum | RealisationImageScalarFieldEnum[]
  }

  /**
   * RealisationImage findFirstOrThrow
   */
  export type RealisationImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * Filter, which RealisationImage to fetch.
     */
    where?: RealisationImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RealisationImages to fetch.
     */
    orderBy?: RealisationImageOrderByWithRelationInput | RealisationImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RealisationImages.
     */
    cursor?: RealisationImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RealisationImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RealisationImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RealisationImages.
     */
    distinct?: RealisationImageScalarFieldEnum | RealisationImageScalarFieldEnum[]
  }

  /**
   * RealisationImage findMany
   */
  export type RealisationImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * Filter, which RealisationImages to fetch.
     */
    where?: RealisationImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RealisationImages to fetch.
     */
    orderBy?: RealisationImageOrderByWithRelationInput | RealisationImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RealisationImages.
     */
    cursor?: RealisationImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RealisationImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RealisationImages.
     */
    skip?: number
    distinct?: RealisationImageScalarFieldEnum | RealisationImageScalarFieldEnum[]
  }

  /**
   * RealisationImage create
   */
  export type RealisationImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * The data needed to create a RealisationImage.
     */
    data: XOR<RealisationImageCreateInput, RealisationImageUncheckedCreateInput>
  }

  /**
   * RealisationImage createMany
   */
  export type RealisationImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RealisationImages.
     */
    data: RealisationImageCreateManyInput | RealisationImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RealisationImage createManyAndReturn
   */
  export type RealisationImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * The data used to create many RealisationImages.
     */
    data: RealisationImageCreateManyInput | RealisationImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RealisationImage update
   */
  export type RealisationImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * The data needed to update a RealisationImage.
     */
    data: XOR<RealisationImageUpdateInput, RealisationImageUncheckedUpdateInput>
    /**
     * Choose, which RealisationImage to update.
     */
    where: RealisationImageWhereUniqueInput
  }

  /**
   * RealisationImage updateMany
   */
  export type RealisationImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RealisationImages.
     */
    data: XOR<RealisationImageUpdateManyMutationInput, RealisationImageUncheckedUpdateManyInput>
    /**
     * Filter which RealisationImages to update
     */
    where?: RealisationImageWhereInput
    /**
     * Limit how many RealisationImages to update.
     */
    limit?: number
  }

  /**
   * RealisationImage updateManyAndReturn
   */
  export type RealisationImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * The data used to update RealisationImages.
     */
    data: XOR<RealisationImageUpdateManyMutationInput, RealisationImageUncheckedUpdateManyInput>
    /**
     * Filter which RealisationImages to update
     */
    where?: RealisationImageWhereInput
    /**
     * Limit how many RealisationImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RealisationImage upsert
   */
  export type RealisationImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * The filter to search for the RealisationImage to update in case it exists.
     */
    where: RealisationImageWhereUniqueInput
    /**
     * In case the RealisationImage found by the `where` argument doesn't exist, create a new RealisationImage with this data.
     */
    create: XOR<RealisationImageCreateInput, RealisationImageUncheckedCreateInput>
    /**
     * In case the RealisationImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RealisationImageUpdateInput, RealisationImageUncheckedUpdateInput>
  }

  /**
   * RealisationImage delete
   */
  export type RealisationImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
    /**
     * Filter which RealisationImage to delete.
     */
    where: RealisationImageWhereUniqueInput
  }

  /**
   * RealisationImage deleteMany
   */
  export type RealisationImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RealisationImages to delete
     */
    where?: RealisationImageWhereInput
    /**
     * Limit how many RealisationImages to delete.
     */
    limit?: number
  }

  /**
   * RealisationImage without action
   */
  export type RealisationImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RealisationImage
     */
    select?: RealisationImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RealisationImage
     */
    omit?: RealisationImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationImageInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    realisations?: boolean | Category$realisationsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisations?: boolean | Category$realisationsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      realisations: Prisma.$RealisationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    realisations<T extends Category$realisationsArgs<ExtArgs> = {}>(args?: Subset<T, Category$realisationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.realisations
   */
  export type Category$realisationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    where?: RealisationsWhereInput
    orderBy?: RealisationsOrderByWithRelationInput | RealisationsOrderByWithRelationInput[]
    cursor?: RealisationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RealisationsScalarFieldEnum | RealisationsScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    realisations?: boolean | Tag$realisationsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    realisations?: boolean | Tag$realisationsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      realisations: Prisma.$RealisationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    realisations<T extends Tag$realisationsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$realisationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealisationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.realisations
   */
  export type Tag$realisationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realisations
     */
    select?: RealisationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realisations
     */
    omit?: RealisationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RealisationsInclude<ExtArgs> | null
    where?: RealisationsWhereInput
    orderBy?: RealisationsOrderByWithRelationInput | RealisationsOrderByWithRelationInput[]
    cursor?: RealisationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RealisationsScalarFieldEnum | RealisationsScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model SiteImage
   */

  export type AggregateSiteImage = {
    _count: SiteImageCountAggregateOutputType | null
    _avg: SiteImageAvgAggregateOutputType | null
    _sum: SiteImageSumAggregateOutputType | null
    _min: SiteImageMinAggregateOutputType | null
    _max: SiteImageMaxAggregateOutputType | null
  }

  export type SiteImageAvgAggregateOutputType = {
    id: number | null
  }

  export type SiteImageSumAggregateOutputType = {
    id: number | null
  }

  export type SiteImageMinAggregateOutputType = {
    id: number | null
    key: string | null
    url: string | null
    updatedAt: Date | null
  }

  export type SiteImageMaxAggregateOutputType = {
    id: number | null
    key: string | null
    url: string | null
    updatedAt: Date | null
  }

  export type SiteImageCountAggregateOutputType = {
    id: number
    key: number
    url: number
    updatedAt: number
    _all: number
  }


  export type SiteImageAvgAggregateInputType = {
    id?: true
  }

  export type SiteImageSumAggregateInputType = {
    id?: true
  }

  export type SiteImageMinAggregateInputType = {
    id?: true
    key?: true
    url?: true
    updatedAt?: true
  }

  export type SiteImageMaxAggregateInputType = {
    id?: true
    key?: true
    url?: true
    updatedAt?: true
  }

  export type SiteImageCountAggregateInputType = {
    id?: true
    key?: true
    url?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteImage to aggregate.
     */
    where?: SiteImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteImages to fetch.
     */
    orderBy?: SiteImageOrderByWithRelationInput | SiteImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteImages
    **/
    _count?: true | SiteImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteImageMaxAggregateInputType
  }

  export type GetSiteImageAggregateType<T extends SiteImageAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteImage[P]>
      : GetScalarType<T[P], AggregateSiteImage[P]>
  }




  export type SiteImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteImageWhereInput
    orderBy?: SiteImageOrderByWithAggregationInput | SiteImageOrderByWithAggregationInput[]
    by: SiteImageScalarFieldEnum[] | SiteImageScalarFieldEnum
    having?: SiteImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteImageCountAggregateInputType | true
    _avg?: SiteImageAvgAggregateInputType
    _sum?: SiteImageSumAggregateInputType
    _min?: SiteImageMinAggregateInputType
    _max?: SiteImageMaxAggregateInputType
  }

  export type SiteImageGroupByOutputType = {
    id: number
    key: string
    url: string
    updatedAt: Date
    _count: SiteImageCountAggregateOutputType | null
    _avg: SiteImageAvgAggregateOutputType | null
    _sum: SiteImageSumAggregateOutputType | null
    _min: SiteImageMinAggregateOutputType | null
    _max: SiteImageMaxAggregateOutputType | null
  }

  type GetSiteImageGroupByPayload<T extends SiteImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteImageGroupByOutputType[P]>
            : GetScalarType<T[P], SiteImageGroupByOutputType[P]>
        }
      >
    >


  export type SiteImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    url?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteImage"]>

  export type SiteImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    url?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteImage"]>

  export type SiteImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    url?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteImage"]>

  export type SiteImageSelectScalar = {
    id?: boolean
    key?: boolean
    url?: boolean
    updatedAt?: boolean
  }

  export type SiteImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "url" | "updatedAt", ExtArgs["result"]["siteImage"]>

  export type $SiteImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteImage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      url: string
      updatedAt: Date
    }, ExtArgs["result"]["siteImage"]>
    composites: {}
  }

  type SiteImageGetPayload<S extends boolean | null | undefined | SiteImageDefaultArgs> = $Result.GetResult<Prisma.$SiteImagePayload, S>

  type SiteImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteImageCountAggregateInputType | true
    }

  export interface SiteImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteImage'], meta: { name: 'SiteImage' } }
    /**
     * Find zero or one SiteImage that matches the filter.
     * @param {SiteImageFindUniqueArgs} args - Arguments to find a SiteImage
     * @example
     * // Get one SiteImage
     * const siteImage = await prisma.siteImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteImageFindUniqueArgs>(args: SelectSubset<T, SiteImageFindUniqueArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteImageFindUniqueOrThrowArgs} args - Arguments to find a SiteImage
     * @example
     * // Get one SiteImage
     * const siteImage = await prisma.siteImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteImageFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageFindFirstArgs} args - Arguments to find a SiteImage
     * @example
     * // Get one SiteImage
     * const siteImage = await prisma.siteImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteImageFindFirstArgs>(args?: SelectSubset<T, SiteImageFindFirstArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageFindFirstOrThrowArgs} args - Arguments to find a SiteImage
     * @example
     * // Get one SiteImage
     * const siteImage = await prisma.siteImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteImageFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteImages
     * const siteImages = await prisma.siteImage.findMany()
     * 
     * // Get first 10 SiteImages
     * const siteImages = await prisma.siteImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteImageWithIdOnly = await prisma.siteImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteImageFindManyArgs>(args?: SelectSubset<T, SiteImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteImage.
     * @param {SiteImageCreateArgs} args - Arguments to create a SiteImage.
     * @example
     * // Create one SiteImage
     * const SiteImage = await prisma.siteImage.create({
     *   data: {
     *     // ... data to create a SiteImage
     *   }
     * })
     * 
     */
    create<T extends SiteImageCreateArgs>(args: SelectSubset<T, SiteImageCreateArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteImages.
     * @param {SiteImageCreateManyArgs} args - Arguments to create many SiteImages.
     * @example
     * // Create many SiteImages
     * const siteImage = await prisma.siteImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteImageCreateManyArgs>(args?: SelectSubset<T, SiteImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteImages and returns the data saved in the database.
     * @param {SiteImageCreateManyAndReturnArgs} args - Arguments to create many SiteImages.
     * @example
     * // Create many SiteImages
     * const siteImage = await prisma.siteImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteImages and only return the `id`
     * const siteImageWithIdOnly = await prisma.siteImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteImageCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteImage.
     * @param {SiteImageDeleteArgs} args - Arguments to delete one SiteImage.
     * @example
     * // Delete one SiteImage
     * const SiteImage = await prisma.siteImage.delete({
     *   where: {
     *     // ... filter to delete one SiteImage
     *   }
     * })
     * 
     */
    delete<T extends SiteImageDeleteArgs>(args: SelectSubset<T, SiteImageDeleteArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteImage.
     * @param {SiteImageUpdateArgs} args - Arguments to update one SiteImage.
     * @example
     * // Update one SiteImage
     * const siteImage = await prisma.siteImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteImageUpdateArgs>(args: SelectSubset<T, SiteImageUpdateArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteImages.
     * @param {SiteImageDeleteManyArgs} args - Arguments to filter SiteImages to delete.
     * @example
     * // Delete a few SiteImages
     * const { count } = await prisma.siteImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteImageDeleteManyArgs>(args?: SelectSubset<T, SiteImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteImages
     * const siteImage = await prisma.siteImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteImageUpdateManyArgs>(args: SelectSubset<T, SiteImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteImages and returns the data updated in the database.
     * @param {SiteImageUpdateManyAndReturnArgs} args - Arguments to update many SiteImages.
     * @example
     * // Update many SiteImages
     * const siteImage = await prisma.siteImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteImages and only return the `id`
     * const siteImageWithIdOnly = await prisma.siteImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteImageUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteImage.
     * @param {SiteImageUpsertArgs} args - Arguments to update or create a SiteImage.
     * @example
     * // Update or create a SiteImage
     * const siteImage = await prisma.siteImage.upsert({
     *   create: {
     *     // ... data to create a SiteImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteImage we want to update
     *   }
     * })
     */
    upsert<T extends SiteImageUpsertArgs>(args: SelectSubset<T, SiteImageUpsertArgs<ExtArgs>>): Prisma__SiteImageClient<$Result.GetResult<Prisma.$SiteImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageCountArgs} args - Arguments to filter SiteImages to count.
     * @example
     * // Count the number of SiteImages
     * const count = await prisma.siteImage.count({
     *   where: {
     *     // ... the filter for the SiteImages we want to count
     *   }
     * })
    **/
    count<T extends SiteImageCountArgs>(
      args?: Subset<T, SiteImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteImageAggregateArgs>(args: Subset<T, SiteImageAggregateArgs>): Prisma.PrismaPromise<GetSiteImageAggregateType<T>>

    /**
     * Group by SiteImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteImageGroupByArgs['orderBy'] }
        : { orderBy?: SiteImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteImage model
   */
  readonly fields: SiteImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteImage model
   */
  interface SiteImageFieldRefs {
    readonly id: FieldRef<"SiteImage", 'Int'>
    readonly key: FieldRef<"SiteImage", 'String'>
    readonly url: FieldRef<"SiteImage", 'String'>
    readonly updatedAt: FieldRef<"SiteImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteImage findUnique
   */
  export type SiteImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * Filter, which SiteImage to fetch.
     */
    where: SiteImageWhereUniqueInput
  }

  /**
   * SiteImage findUniqueOrThrow
   */
  export type SiteImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * Filter, which SiteImage to fetch.
     */
    where: SiteImageWhereUniqueInput
  }

  /**
   * SiteImage findFirst
   */
  export type SiteImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * Filter, which SiteImage to fetch.
     */
    where?: SiteImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteImages to fetch.
     */
    orderBy?: SiteImageOrderByWithRelationInput | SiteImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteImages.
     */
    cursor?: SiteImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteImages.
     */
    distinct?: SiteImageScalarFieldEnum | SiteImageScalarFieldEnum[]
  }

  /**
   * SiteImage findFirstOrThrow
   */
  export type SiteImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * Filter, which SiteImage to fetch.
     */
    where?: SiteImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteImages to fetch.
     */
    orderBy?: SiteImageOrderByWithRelationInput | SiteImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteImages.
     */
    cursor?: SiteImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteImages.
     */
    distinct?: SiteImageScalarFieldEnum | SiteImageScalarFieldEnum[]
  }

  /**
   * SiteImage findMany
   */
  export type SiteImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * Filter, which SiteImages to fetch.
     */
    where?: SiteImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteImages to fetch.
     */
    orderBy?: SiteImageOrderByWithRelationInput | SiteImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteImages.
     */
    cursor?: SiteImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteImages.
     */
    skip?: number
    distinct?: SiteImageScalarFieldEnum | SiteImageScalarFieldEnum[]
  }

  /**
   * SiteImage create
   */
  export type SiteImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * The data needed to create a SiteImage.
     */
    data: XOR<SiteImageCreateInput, SiteImageUncheckedCreateInput>
  }

  /**
   * SiteImage createMany
   */
  export type SiteImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteImages.
     */
    data: SiteImageCreateManyInput | SiteImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteImage createManyAndReturn
   */
  export type SiteImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * The data used to create many SiteImages.
     */
    data: SiteImageCreateManyInput | SiteImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteImage update
   */
  export type SiteImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * The data needed to update a SiteImage.
     */
    data: XOR<SiteImageUpdateInput, SiteImageUncheckedUpdateInput>
    /**
     * Choose, which SiteImage to update.
     */
    where: SiteImageWhereUniqueInput
  }

  /**
   * SiteImage updateMany
   */
  export type SiteImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteImages.
     */
    data: XOR<SiteImageUpdateManyMutationInput, SiteImageUncheckedUpdateManyInput>
    /**
     * Filter which SiteImages to update
     */
    where?: SiteImageWhereInput
    /**
     * Limit how many SiteImages to update.
     */
    limit?: number
  }

  /**
   * SiteImage updateManyAndReturn
   */
  export type SiteImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * The data used to update SiteImages.
     */
    data: XOR<SiteImageUpdateManyMutationInput, SiteImageUncheckedUpdateManyInput>
    /**
     * Filter which SiteImages to update
     */
    where?: SiteImageWhereInput
    /**
     * Limit how many SiteImages to update.
     */
    limit?: number
  }

  /**
   * SiteImage upsert
   */
  export type SiteImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * The filter to search for the SiteImage to update in case it exists.
     */
    where: SiteImageWhereUniqueInput
    /**
     * In case the SiteImage found by the `where` argument doesn't exist, create a new SiteImage with this data.
     */
    create: XOR<SiteImageCreateInput, SiteImageUncheckedCreateInput>
    /**
     * In case the SiteImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteImageUpdateInput, SiteImageUncheckedUpdateInput>
  }

  /**
   * SiteImage delete
   */
  export type SiteImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
    /**
     * Filter which SiteImage to delete.
     */
    where: SiteImageWhereUniqueInput
  }

  /**
   * SiteImage deleteMany
   */
  export type SiteImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteImages to delete
     */
    where?: SiteImageWhereInput
    /**
     * Limit how many SiteImages to delete.
     */
    limit?: number
  }

  /**
   * SiteImage without action
   */
  export type SiteImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteImage
     */
    select?: SiteImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteImage
     */
    omit?: SiteImageOmit<ExtArgs> | null
  }


  /**
   * Model admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    username: number
    password: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin to aggregate.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type adminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminWhereInput
    orderBy?: adminOrderByWithAggregationInput | adminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: adminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    username: string
    password: string
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
  }, ExtArgs["result"]["admin"]>

  export type adminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
  }, ExtArgs["result"]["admin"]>

  export type adminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
  }, ExtArgs["result"]["admin"]>

  export type adminSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
  }

  export type adminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password", ExtArgs["result"]["admin"]>

  export type $adminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type adminGetPayload<S extends boolean | null | undefined | adminDefaultArgs> = $Result.GetResult<Prisma.$adminPayload, S>

  type adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<adminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface adminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admin'], meta: { name: 'admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {adminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminFindUniqueArgs>(args: SelectSubset<T, adminFindUniqueArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {adminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminFindUniqueOrThrowArgs>(args: SelectSubset<T, adminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminFindFirstArgs>(args?: SelectSubset<T, adminFindFirstArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminFindFirstOrThrowArgs>(args?: SelectSubset<T, adminFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends adminFindManyArgs>(args?: SelectSubset<T, adminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {adminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends adminCreateArgs>(args: SelectSubset<T, adminCreateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {adminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminCreateManyArgs>(args?: SelectSubset<T, adminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {adminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends adminCreateManyAndReturnArgs>(args?: SelectSubset<T, adminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {adminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends adminDeleteArgs>(args: SelectSubset<T, adminDeleteArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {adminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminUpdateArgs>(args: SelectSubset<T, adminUpdateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {adminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminDeleteManyArgs>(args?: SelectSubset<T, adminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminUpdateManyArgs>(args: SelectSubset<T, adminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {adminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends adminUpdateManyAndReturnArgs>(args: SelectSubset<T, adminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {adminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends adminUpsertArgs>(args: SelectSubset<T, adminUpsertArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends adminCountArgs>(
      args?: Subset<T, adminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminGroupByArgs['orderBy'] }
        : { orderBy?: adminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admin model
   */
  readonly fields: adminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admin model
   */
  interface adminFieldRefs {
    readonly id: FieldRef<"admin", 'Int'>
    readonly username: FieldRef<"admin", 'String'>
    readonly password: FieldRef<"admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * admin findUnique
   */
  export type adminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findUniqueOrThrow
   */
  export type adminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findFirst
   */
  export type adminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findFirstOrThrow
   */
  export type adminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findMany
   */
  export type adminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin create
   */
  export type adminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data needed to create a admin.
     */
    data: XOR<adminCreateInput, adminUncheckedCreateInput>
  }

  /**
   * admin createMany
   */
  export type adminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin createManyAndReturn
   */
  export type adminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin update
   */
  export type adminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data needed to update a admin.
     */
    data: XOR<adminUpdateInput, adminUncheckedUpdateInput>
    /**
     * Choose, which admin to update.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin updateMany
   */
  export type adminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
  }

  /**
   * admin updateManyAndReturn
   */
  export type adminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
  }

  /**
   * admin upsert
   */
  export type adminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The filter to search for the admin to update in case it exists.
     */
    where: adminWhereUniqueInput
    /**
     * In case the admin found by the `where` argument doesn't exist, create a new admin with this data.
     */
    create: XOR<adminCreateInput, adminUncheckedCreateInput>
    /**
     * In case the admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminUpdateInput, adminUncheckedUpdateInput>
  }

  /**
   * admin delete
   */
  export type adminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter which admin to delete.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin deleteMany
   */
  export type adminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to delete
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to delete.
     */
    limit?: number
  }

  /**
   * admin without action
   */
  export type adminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RealisationsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    location: 'location',
    imageUrl: 'imageUrl',
    videoUrl: 'videoUrl',
    youtubeUrl: 'youtubeUrl',
    link: 'link',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RealisationsScalarFieldEnum = (typeof RealisationsScalarFieldEnum)[keyof typeof RealisationsScalarFieldEnum]


  export const RealisationImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    position: 'position',
    realisationId: 'realisationId'
  };

  export type RealisationImageScalarFieldEnum = (typeof RealisationImageScalarFieldEnum)[keyof typeof RealisationImageScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const SiteImageScalarFieldEnum: {
    id: 'id',
    key: 'key',
    url: 'url',
    updatedAt: 'updatedAt'
  };

  export type SiteImageScalarFieldEnum = (typeof SiteImageScalarFieldEnum)[keyof typeof SiteImageScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RealisationsWhereInput = {
    AND?: RealisationsWhereInput | RealisationsWhereInput[]
    OR?: RealisationsWhereInput[]
    NOT?: RealisationsWhereInput | RealisationsWhereInput[]
    id?: IntFilter<"Realisations"> | number
    title?: StringFilter<"Realisations"> | string
    description?: StringFilter<"Realisations"> | string
    location?: StringNullableFilter<"Realisations"> | string | null
    imageUrl?: StringNullableFilter<"Realisations"> | string | null
    videoUrl?: StringNullableFilter<"Realisations"> | string | null
    youtubeUrl?: StringNullableFilter<"Realisations"> | string | null
    link?: StringNullableFilter<"Realisations"> | string | null
    createdAt?: DateTimeFilter<"Realisations"> | Date | string
    updatedAt?: DateTimeFilter<"Realisations"> | Date | string
    images?: RealisationImageListRelationFilter
    categories?: CategoryListRelationFilter
    tags?: TagListRelationFilter
  }

  export type RealisationsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    images?: RealisationImageOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
  }

  export type RealisationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RealisationsWhereInput | RealisationsWhereInput[]
    OR?: RealisationsWhereInput[]
    NOT?: RealisationsWhereInput | RealisationsWhereInput[]
    title?: StringFilter<"Realisations"> | string
    description?: StringFilter<"Realisations"> | string
    location?: StringNullableFilter<"Realisations"> | string | null
    imageUrl?: StringNullableFilter<"Realisations"> | string | null
    videoUrl?: StringNullableFilter<"Realisations"> | string | null
    youtubeUrl?: StringNullableFilter<"Realisations"> | string | null
    link?: StringNullableFilter<"Realisations"> | string | null
    createdAt?: DateTimeFilter<"Realisations"> | Date | string
    updatedAt?: DateTimeFilter<"Realisations"> | Date | string
    images?: RealisationImageListRelationFilter
    categories?: CategoryListRelationFilter
    tags?: TagListRelationFilter
  }, "id">

  export type RealisationsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RealisationsCountOrderByAggregateInput
    _avg?: RealisationsAvgOrderByAggregateInput
    _max?: RealisationsMaxOrderByAggregateInput
    _min?: RealisationsMinOrderByAggregateInput
    _sum?: RealisationsSumOrderByAggregateInput
  }

  export type RealisationsScalarWhereWithAggregatesInput = {
    AND?: RealisationsScalarWhereWithAggregatesInput | RealisationsScalarWhereWithAggregatesInput[]
    OR?: RealisationsScalarWhereWithAggregatesInput[]
    NOT?: RealisationsScalarWhereWithAggregatesInput | RealisationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Realisations"> | number
    title?: StringWithAggregatesFilter<"Realisations"> | string
    description?: StringWithAggregatesFilter<"Realisations"> | string
    location?: StringNullableWithAggregatesFilter<"Realisations"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Realisations"> | string | null
    videoUrl?: StringNullableWithAggregatesFilter<"Realisations"> | string | null
    youtubeUrl?: StringNullableWithAggregatesFilter<"Realisations"> | string | null
    link?: StringNullableWithAggregatesFilter<"Realisations"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Realisations"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Realisations"> | Date | string
  }

  export type RealisationImageWhereInput = {
    AND?: RealisationImageWhereInput | RealisationImageWhereInput[]
    OR?: RealisationImageWhereInput[]
    NOT?: RealisationImageWhereInput | RealisationImageWhereInput[]
    id?: IntFilter<"RealisationImage"> | number
    url?: StringFilter<"RealisationImage"> | string
    position?: IntFilter<"RealisationImage"> | number
    realisationId?: IntFilter<"RealisationImage"> | number
    realisation?: XOR<RealisationsScalarRelationFilter, RealisationsWhereInput>
  }

  export type RealisationImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
    realisation?: RealisationsOrderByWithRelationInput
  }

  export type RealisationImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RealisationImageWhereInput | RealisationImageWhereInput[]
    OR?: RealisationImageWhereInput[]
    NOT?: RealisationImageWhereInput | RealisationImageWhereInput[]
    url?: StringFilter<"RealisationImage"> | string
    position?: IntFilter<"RealisationImage"> | number
    realisationId?: IntFilter<"RealisationImage"> | number
    realisation?: XOR<RealisationsScalarRelationFilter, RealisationsWhereInput>
  }, "id">

  export type RealisationImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
    _count?: RealisationImageCountOrderByAggregateInput
    _avg?: RealisationImageAvgOrderByAggregateInput
    _max?: RealisationImageMaxOrderByAggregateInput
    _min?: RealisationImageMinOrderByAggregateInput
    _sum?: RealisationImageSumOrderByAggregateInput
  }

  export type RealisationImageScalarWhereWithAggregatesInput = {
    AND?: RealisationImageScalarWhereWithAggregatesInput | RealisationImageScalarWhereWithAggregatesInput[]
    OR?: RealisationImageScalarWhereWithAggregatesInput[]
    NOT?: RealisationImageScalarWhereWithAggregatesInput | RealisationImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RealisationImage"> | number
    url?: StringWithAggregatesFilter<"RealisationImage"> | string
    position?: IntWithAggregatesFilter<"RealisationImage"> | number
    realisationId?: IntWithAggregatesFilter<"RealisationImage"> | number
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    realisations?: RealisationsListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    realisations?: RealisationsOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    realisations?: RealisationsListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    realisations?: RealisationsListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    realisations?: RealisationsOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    realisations?: RealisationsListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type SiteImageWhereInput = {
    AND?: SiteImageWhereInput | SiteImageWhereInput[]
    OR?: SiteImageWhereInput[]
    NOT?: SiteImageWhereInput | SiteImageWhereInput[]
    id?: IntFilter<"SiteImage"> | number
    key?: StringFilter<"SiteImage"> | string
    url?: StringFilter<"SiteImage"> | string
    updatedAt?: DateTimeFilter<"SiteImage"> | Date | string
  }

  export type SiteImageOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: SiteImageWhereInput | SiteImageWhereInput[]
    OR?: SiteImageWhereInput[]
    NOT?: SiteImageWhereInput | SiteImageWhereInput[]
    url?: StringFilter<"SiteImage"> | string
    updatedAt?: DateTimeFilter<"SiteImage"> | Date | string
  }, "id" | "key">

  export type SiteImageOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteImageCountOrderByAggregateInput
    _avg?: SiteImageAvgOrderByAggregateInput
    _max?: SiteImageMaxOrderByAggregateInput
    _min?: SiteImageMinOrderByAggregateInput
    _sum?: SiteImageSumOrderByAggregateInput
  }

  export type SiteImageScalarWhereWithAggregatesInput = {
    AND?: SiteImageScalarWhereWithAggregatesInput | SiteImageScalarWhereWithAggregatesInput[]
    OR?: SiteImageScalarWhereWithAggregatesInput[]
    NOT?: SiteImageScalarWhereWithAggregatesInput | SiteImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SiteImage"> | number
    key?: StringWithAggregatesFilter<"SiteImage"> | string
    url?: StringWithAggregatesFilter<"SiteImage"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SiteImage"> | Date | string
  }

  export type adminWhereInput = {
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    id?: IntFilter<"admin"> | number
    username?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
  }

  export type adminOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type adminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    password?: StringFilter<"admin"> | string
  }, "id" | "username">

  export type adminOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    _count?: adminCountOrderByAggregateInput
    _avg?: adminAvgOrderByAggregateInput
    _max?: adminMaxOrderByAggregateInput
    _min?: adminMinOrderByAggregateInput
    _sum?: adminSumOrderByAggregateInput
  }

  export type adminScalarWhereWithAggregatesInput = {
    AND?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    OR?: adminScalarWhereWithAggregatesInput[]
    NOT?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"admin"> | number
    username?: StringWithAggregatesFilter<"admin"> | string
    password?: StringWithAggregatesFilter<"admin"> | string
  }

  export type RealisationsCreateInput = {
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: RealisationImageCreateNestedManyWithoutRealisationInput
    categories?: CategoryCreateNestedManyWithoutRealisationsInput
    tags?: TagCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: RealisationImageUncheckedCreateNestedManyWithoutRealisationInput
    categories?: CategoryUncheckedCreateNestedManyWithoutRealisationsInput
    tags?: TagUncheckedCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: RealisationImageUpdateManyWithoutRealisationNestedInput
    categories?: CategoryUpdateManyWithoutRealisationsNestedInput
    tags?: TagUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: RealisationImageUncheckedUpdateManyWithoutRealisationNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutRealisationsNestedInput
    tags?: TagUncheckedUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsCreateManyInput = {
    id?: number
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RealisationsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RealisationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RealisationImageCreateInput = {
    url: string
    position?: number
    realisation: RealisationsCreateNestedOneWithoutImagesInput
  }

  export type RealisationImageUncheckedCreateInput = {
    id?: number
    url: string
    position?: number
    realisationId: number
  }

  export type RealisationImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    realisation?: RealisationsUpdateOneRequiredWithoutImagesNestedInput
  }

  export type RealisationImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    realisationId?: IntFieldUpdateOperationsInput | number
  }

  export type RealisationImageCreateManyInput = {
    id?: number
    url: string
    position?: number
    realisationId: number
  }

  export type RealisationImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type RealisationImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    realisationId?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryCreateInput = {
    name: string
    realisations?: RealisationsCreateNestedManyWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    realisations?: RealisationsUncheckedCreateNestedManyWithoutCategoriesInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    realisations?: RealisationsUpdateManyWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    realisations?: RealisationsUncheckedUpdateManyWithoutCategoriesNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    name: string
    realisations?: RealisationsCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    realisations?: RealisationsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    realisations?: RealisationsUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    realisations?: RealisationsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SiteImageCreateInput = {
    key: string
    url: string
    updatedAt?: Date | string
  }

  export type SiteImageUncheckedCreateInput = {
    id?: number
    key: string
    url: string
    updatedAt?: Date | string
  }

  export type SiteImageUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteImageCreateManyInput = {
    id?: number
    key: string
    url: string
    updatedAt?: Date | string
  }

  export type SiteImageUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminCreateInput = {
    username: string
    password: string
  }

  export type adminUncheckedCreateInput = {
    id?: number
    username: string
    password: string
  }

  export type adminUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type adminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type adminCreateManyInput = {
    id?: number
    username: string
    password: string
  }

  export type adminUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type adminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RealisationImageListRelationFilter = {
    every?: RealisationImageWhereInput
    some?: RealisationImageWhereInput
    none?: RealisationImageWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RealisationImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RealisationsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    videoUrl?: SortOrder
    youtubeUrl?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RealisationsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RealisationsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    videoUrl?: SortOrder
    youtubeUrl?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RealisationsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    videoUrl?: SortOrder
    youtubeUrl?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RealisationsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RealisationsScalarRelationFilter = {
    is?: RealisationsWhereInput
    isNot?: RealisationsWhereInput
  }

  export type RealisationImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
  }

  export type RealisationImageAvgOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
  }

  export type RealisationImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
  }

  export type RealisationImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
  }

  export type RealisationImageSumOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
    realisationId?: SortOrder
  }

  export type RealisationsListRelationFilter = {
    every?: RealisationsWhereInput
    some?: RealisationsWhereInput
    none?: RealisationsWhereInput
  }

  export type RealisationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SiteImageCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteImageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SiteImageMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteImageMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteImageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type adminCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type adminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type adminMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type adminMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type adminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RealisationImageCreateNestedManyWithoutRealisationInput = {
    create?: XOR<RealisationImageCreateWithoutRealisationInput, RealisationImageUncheckedCreateWithoutRealisationInput> | RealisationImageCreateWithoutRealisationInput[] | RealisationImageUncheckedCreateWithoutRealisationInput[]
    connectOrCreate?: RealisationImageCreateOrConnectWithoutRealisationInput | RealisationImageCreateOrConnectWithoutRealisationInput[]
    createMany?: RealisationImageCreateManyRealisationInputEnvelope
    connect?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutRealisationsInput = {
    create?: XOR<CategoryCreateWithoutRealisationsInput, CategoryUncheckedCreateWithoutRealisationsInput> | CategoryCreateWithoutRealisationsInput[] | CategoryUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRealisationsInput | CategoryCreateOrConnectWithoutRealisationsInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutRealisationsInput = {
    create?: XOR<TagCreateWithoutRealisationsInput, TagUncheckedCreateWithoutRealisationsInput> | TagCreateWithoutRealisationsInput[] | TagUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutRealisationsInput | TagCreateOrConnectWithoutRealisationsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type RealisationImageUncheckedCreateNestedManyWithoutRealisationInput = {
    create?: XOR<RealisationImageCreateWithoutRealisationInput, RealisationImageUncheckedCreateWithoutRealisationInput> | RealisationImageCreateWithoutRealisationInput[] | RealisationImageUncheckedCreateWithoutRealisationInput[]
    connectOrCreate?: RealisationImageCreateOrConnectWithoutRealisationInput | RealisationImageCreateOrConnectWithoutRealisationInput[]
    createMany?: RealisationImageCreateManyRealisationInputEnvelope
    connect?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutRealisationsInput = {
    create?: XOR<CategoryCreateWithoutRealisationsInput, CategoryUncheckedCreateWithoutRealisationsInput> | CategoryCreateWithoutRealisationsInput[] | CategoryUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRealisationsInput | CategoryCreateOrConnectWithoutRealisationsInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutRealisationsInput = {
    create?: XOR<TagCreateWithoutRealisationsInput, TagUncheckedCreateWithoutRealisationsInput> | TagCreateWithoutRealisationsInput[] | TagUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutRealisationsInput | TagCreateOrConnectWithoutRealisationsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RealisationImageUpdateManyWithoutRealisationNestedInput = {
    create?: XOR<RealisationImageCreateWithoutRealisationInput, RealisationImageUncheckedCreateWithoutRealisationInput> | RealisationImageCreateWithoutRealisationInput[] | RealisationImageUncheckedCreateWithoutRealisationInput[]
    connectOrCreate?: RealisationImageCreateOrConnectWithoutRealisationInput | RealisationImageCreateOrConnectWithoutRealisationInput[]
    upsert?: RealisationImageUpsertWithWhereUniqueWithoutRealisationInput | RealisationImageUpsertWithWhereUniqueWithoutRealisationInput[]
    createMany?: RealisationImageCreateManyRealisationInputEnvelope
    set?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    disconnect?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    delete?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    connect?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    update?: RealisationImageUpdateWithWhereUniqueWithoutRealisationInput | RealisationImageUpdateWithWhereUniqueWithoutRealisationInput[]
    updateMany?: RealisationImageUpdateManyWithWhereWithoutRealisationInput | RealisationImageUpdateManyWithWhereWithoutRealisationInput[]
    deleteMany?: RealisationImageScalarWhereInput | RealisationImageScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutRealisationsNestedInput = {
    create?: XOR<CategoryCreateWithoutRealisationsInput, CategoryUncheckedCreateWithoutRealisationsInput> | CategoryCreateWithoutRealisationsInput[] | CategoryUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRealisationsInput | CategoryCreateOrConnectWithoutRealisationsInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutRealisationsInput | CategoryUpsertWithWhereUniqueWithoutRealisationsInput[]
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutRealisationsInput | CategoryUpdateWithWhereUniqueWithoutRealisationsInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutRealisationsInput | CategoryUpdateManyWithWhereWithoutRealisationsInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type TagUpdateManyWithoutRealisationsNestedInput = {
    create?: XOR<TagCreateWithoutRealisationsInput, TagUncheckedCreateWithoutRealisationsInput> | TagCreateWithoutRealisationsInput[] | TagUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutRealisationsInput | TagCreateOrConnectWithoutRealisationsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutRealisationsInput | TagUpsertWithWhereUniqueWithoutRealisationsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutRealisationsInput | TagUpdateWithWhereUniqueWithoutRealisationsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutRealisationsInput | TagUpdateManyWithWhereWithoutRealisationsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RealisationImageUncheckedUpdateManyWithoutRealisationNestedInput = {
    create?: XOR<RealisationImageCreateWithoutRealisationInput, RealisationImageUncheckedCreateWithoutRealisationInput> | RealisationImageCreateWithoutRealisationInput[] | RealisationImageUncheckedCreateWithoutRealisationInput[]
    connectOrCreate?: RealisationImageCreateOrConnectWithoutRealisationInput | RealisationImageCreateOrConnectWithoutRealisationInput[]
    upsert?: RealisationImageUpsertWithWhereUniqueWithoutRealisationInput | RealisationImageUpsertWithWhereUniqueWithoutRealisationInput[]
    createMany?: RealisationImageCreateManyRealisationInputEnvelope
    set?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    disconnect?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    delete?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    connect?: RealisationImageWhereUniqueInput | RealisationImageWhereUniqueInput[]
    update?: RealisationImageUpdateWithWhereUniqueWithoutRealisationInput | RealisationImageUpdateWithWhereUniqueWithoutRealisationInput[]
    updateMany?: RealisationImageUpdateManyWithWhereWithoutRealisationInput | RealisationImageUpdateManyWithWhereWithoutRealisationInput[]
    deleteMany?: RealisationImageScalarWhereInput | RealisationImageScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutRealisationsNestedInput = {
    create?: XOR<CategoryCreateWithoutRealisationsInput, CategoryUncheckedCreateWithoutRealisationsInput> | CategoryCreateWithoutRealisationsInput[] | CategoryUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRealisationsInput | CategoryCreateOrConnectWithoutRealisationsInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutRealisationsInput | CategoryUpsertWithWhereUniqueWithoutRealisationsInput[]
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutRealisationsInput | CategoryUpdateWithWhereUniqueWithoutRealisationsInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutRealisationsInput | CategoryUpdateManyWithWhereWithoutRealisationsInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutRealisationsNestedInput = {
    create?: XOR<TagCreateWithoutRealisationsInput, TagUncheckedCreateWithoutRealisationsInput> | TagCreateWithoutRealisationsInput[] | TagUncheckedCreateWithoutRealisationsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutRealisationsInput | TagCreateOrConnectWithoutRealisationsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutRealisationsInput | TagUpsertWithWhereUniqueWithoutRealisationsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutRealisationsInput | TagUpdateWithWhereUniqueWithoutRealisationsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutRealisationsInput | TagUpdateManyWithWhereWithoutRealisationsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type RealisationsCreateNestedOneWithoutImagesInput = {
    create?: XOR<RealisationsCreateWithoutImagesInput, RealisationsUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RealisationsCreateOrConnectWithoutImagesInput
    connect?: RealisationsWhereUniqueInput
  }

  export type RealisationsUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<RealisationsCreateWithoutImagesInput, RealisationsUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RealisationsCreateOrConnectWithoutImagesInput
    upsert?: RealisationsUpsertWithoutImagesInput
    connect?: RealisationsWhereUniqueInput
    update?: XOR<XOR<RealisationsUpdateToOneWithWhereWithoutImagesInput, RealisationsUpdateWithoutImagesInput>, RealisationsUncheckedUpdateWithoutImagesInput>
  }

  export type RealisationsCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<RealisationsCreateWithoutCategoriesInput, RealisationsUncheckedCreateWithoutCategoriesInput> | RealisationsCreateWithoutCategoriesInput[] | RealisationsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutCategoriesInput | RealisationsCreateOrConnectWithoutCategoriesInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
  }

  export type RealisationsUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<RealisationsCreateWithoutCategoriesInput, RealisationsUncheckedCreateWithoutCategoriesInput> | RealisationsCreateWithoutCategoriesInput[] | RealisationsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutCategoriesInput | RealisationsCreateOrConnectWithoutCategoriesInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
  }

  export type RealisationsUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<RealisationsCreateWithoutCategoriesInput, RealisationsUncheckedCreateWithoutCategoriesInput> | RealisationsCreateWithoutCategoriesInput[] | RealisationsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutCategoriesInput | RealisationsCreateOrConnectWithoutCategoriesInput[]
    upsert?: RealisationsUpsertWithWhereUniqueWithoutCategoriesInput | RealisationsUpsertWithWhereUniqueWithoutCategoriesInput[]
    set?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    disconnect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    delete?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    update?: RealisationsUpdateWithWhereUniqueWithoutCategoriesInput | RealisationsUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: RealisationsUpdateManyWithWhereWithoutCategoriesInput | RealisationsUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: RealisationsScalarWhereInput | RealisationsScalarWhereInput[]
  }

  export type RealisationsUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<RealisationsCreateWithoutCategoriesInput, RealisationsUncheckedCreateWithoutCategoriesInput> | RealisationsCreateWithoutCategoriesInput[] | RealisationsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutCategoriesInput | RealisationsCreateOrConnectWithoutCategoriesInput[]
    upsert?: RealisationsUpsertWithWhereUniqueWithoutCategoriesInput | RealisationsUpsertWithWhereUniqueWithoutCategoriesInput[]
    set?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    disconnect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    delete?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    update?: RealisationsUpdateWithWhereUniqueWithoutCategoriesInput | RealisationsUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: RealisationsUpdateManyWithWhereWithoutCategoriesInput | RealisationsUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: RealisationsScalarWhereInput | RealisationsScalarWhereInput[]
  }

  export type RealisationsCreateNestedManyWithoutTagsInput = {
    create?: XOR<RealisationsCreateWithoutTagsInput, RealisationsUncheckedCreateWithoutTagsInput> | RealisationsCreateWithoutTagsInput[] | RealisationsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutTagsInput | RealisationsCreateOrConnectWithoutTagsInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
  }

  export type RealisationsUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<RealisationsCreateWithoutTagsInput, RealisationsUncheckedCreateWithoutTagsInput> | RealisationsCreateWithoutTagsInput[] | RealisationsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutTagsInput | RealisationsCreateOrConnectWithoutTagsInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
  }

  export type RealisationsUpdateManyWithoutTagsNestedInput = {
    create?: XOR<RealisationsCreateWithoutTagsInput, RealisationsUncheckedCreateWithoutTagsInput> | RealisationsCreateWithoutTagsInput[] | RealisationsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutTagsInput | RealisationsCreateOrConnectWithoutTagsInput[]
    upsert?: RealisationsUpsertWithWhereUniqueWithoutTagsInput | RealisationsUpsertWithWhereUniqueWithoutTagsInput[]
    set?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    disconnect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    delete?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    update?: RealisationsUpdateWithWhereUniqueWithoutTagsInput | RealisationsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: RealisationsUpdateManyWithWhereWithoutTagsInput | RealisationsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: RealisationsScalarWhereInput | RealisationsScalarWhereInput[]
  }

  export type RealisationsUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<RealisationsCreateWithoutTagsInput, RealisationsUncheckedCreateWithoutTagsInput> | RealisationsCreateWithoutTagsInput[] | RealisationsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: RealisationsCreateOrConnectWithoutTagsInput | RealisationsCreateOrConnectWithoutTagsInput[]
    upsert?: RealisationsUpsertWithWhereUniqueWithoutTagsInput | RealisationsUpsertWithWhereUniqueWithoutTagsInput[]
    set?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    disconnect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    delete?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    connect?: RealisationsWhereUniqueInput | RealisationsWhereUniqueInput[]
    update?: RealisationsUpdateWithWhereUniqueWithoutTagsInput | RealisationsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: RealisationsUpdateManyWithWhereWithoutTagsInput | RealisationsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: RealisationsScalarWhereInput | RealisationsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RealisationImageCreateWithoutRealisationInput = {
    url: string
    position?: number
  }

  export type RealisationImageUncheckedCreateWithoutRealisationInput = {
    id?: number
    url: string
    position?: number
  }

  export type RealisationImageCreateOrConnectWithoutRealisationInput = {
    where: RealisationImageWhereUniqueInput
    create: XOR<RealisationImageCreateWithoutRealisationInput, RealisationImageUncheckedCreateWithoutRealisationInput>
  }

  export type RealisationImageCreateManyRealisationInputEnvelope = {
    data: RealisationImageCreateManyRealisationInput | RealisationImageCreateManyRealisationInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutRealisationsInput = {
    name: string
  }

  export type CategoryUncheckedCreateWithoutRealisationsInput = {
    id?: number
    name: string
  }

  export type CategoryCreateOrConnectWithoutRealisationsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutRealisationsInput, CategoryUncheckedCreateWithoutRealisationsInput>
  }

  export type TagCreateWithoutRealisationsInput = {
    name: string
  }

  export type TagUncheckedCreateWithoutRealisationsInput = {
    id?: number
    name: string
  }

  export type TagCreateOrConnectWithoutRealisationsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutRealisationsInput, TagUncheckedCreateWithoutRealisationsInput>
  }

  export type RealisationImageUpsertWithWhereUniqueWithoutRealisationInput = {
    where: RealisationImageWhereUniqueInput
    update: XOR<RealisationImageUpdateWithoutRealisationInput, RealisationImageUncheckedUpdateWithoutRealisationInput>
    create: XOR<RealisationImageCreateWithoutRealisationInput, RealisationImageUncheckedCreateWithoutRealisationInput>
  }

  export type RealisationImageUpdateWithWhereUniqueWithoutRealisationInput = {
    where: RealisationImageWhereUniqueInput
    data: XOR<RealisationImageUpdateWithoutRealisationInput, RealisationImageUncheckedUpdateWithoutRealisationInput>
  }

  export type RealisationImageUpdateManyWithWhereWithoutRealisationInput = {
    where: RealisationImageScalarWhereInput
    data: XOR<RealisationImageUpdateManyMutationInput, RealisationImageUncheckedUpdateManyWithoutRealisationInput>
  }

  export type RealisationImageScalarWhereInput = {
    AND?: RealisationImageScalarWhereInput | RealisationImageScalarWhereInput[]
    OR?: RealisationImageScalarWhereInput[]
    NOT?: RealisationImageScalarWhereInput | RealisationImageScalarWhereInput[]
    id?: IntFilter<"RealisationImage"> | number
    url?: StringFilter<"RealisationImage"> | string
    position?: IntFilter<"RealisationImage"> | number
    realisationId?: IntFilter<"RealisationImage"> | number
  }

  export type CategoryUpsertWithWhereUniqueWithoutRealisationsInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutRealisationsInput, CategoryUncheckedUpdateWithoutRealisationsInput>
    create: XOR<CategoryCreateWithoutRealisationsInput, CategoryUncheckedCreateWithoutRealisationsInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutRealisationsInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutRealisationsInput, CategoryUncheckedUpdateWithoutRealisationsInput>
  }

  export type CategoryUpdateManyWithWhereWithoutRealisationsInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutRealisationsInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
  }

  export type TagUpsertWithWhereUniqueWithoutRealisationsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutRealisationsInput, TagUncheckedUpdateWithoutRealisationsInput>
    create: XOR<TagCreateWithoutRealisationsInput, TagUncheckedCreateWithoutRealisationsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutRealisationsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutRealisationsInput, TagUncheckedUpdateWithoutRealisationsInput>
  }

  export type TagUpdateManyWithWhereWithoutRealisationsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutRealisationsInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
  }

  export type RealisationsCreateWithoutImagesInput = {
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutRealisationsInput
    tags?: TagCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsUncheckedCreateWithoutImagesInput = {
    id?: number
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutRealisationsInput
    tags?: TagUncheckedCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsCreateOrConnectWithoutImagesInput = {
    where: RealisationsWhereUniqueInput
    create: XOR<RealisationsCreateWithoutImagesInput, RealisationsUncheckedCreateWithoutImagesInput>
  }

  export type RealisationsUpsertWithoutImagesInput = {
    update: XOR<RealisationsUpdateWithoutImagesInput, RealisationsUncheckedUpdateWithoutImagesInput>
    create: XOR<RealisationsCreateWithoutImagesInput, RealisationsUncheckedCreateWithoutImagesInput>
    where?: RealisationsWhereInput
  }

  export type RealisationsUpdateToOneWithWhereWithoutImagesInput = {
    where?: RealisationsWhereInput
    data: XOR<RealisationsUpdateWithoutImagesInput, RealisationsUncheckedUpdateWithoutImagesInput>
  }

  export type RealisationsUpdateWithoutImagesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutRealisationsNestedInput
    tags?: TagUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutRealisationsNestedInput
    tags?: TagUncheckedUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsCreateWithoutCategoriesInput = {
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: RealisationImageCreateNestedManyWithoutRealisationInput
    tags?: TagCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsUncheckedCreateWithoutCategoriesInput = {
    id?: number
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: RealisationImageUncheckedCreateNestedManyWithoutRealisationInput
    tags?: TagUncheckedCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsCreateOrConnectWithoutCategoriesInput = {
    where: RealisationsWhereUniqueInput
    create: XOR<RealisationsCreateWithoutCategoriesInput, RealisationsUncheckedCreateWithoutCategoriesInput>
  }

  export type RealisationsUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: RealisationsWhereUniqueInput
    update: XOR<RealisationsUpdateWithoutCategoriesInput, RealisationsUncheckedUpdateWithoutCategoriesInput>
    create: XOR<RealisationsCreateWithoutCategoriesInput, RealisationsUncheckedCreateWithoutCategoriesInput>
  }

  export type RealisationsUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: RealisationsWhereUniqueInput
    data: XOR<RealisationsUpdateWithoutCategoriesInput, RealisationsUncheckedUpdateWithoutCategoriesInput>
  }

  export type RealisationsUpdateManyWithWhereWithoutCategoriesInput = {
    where: RealisationsScalarWhereInput
    data: XOR<RealisationsUpdateManyMutationInput, RealisationsUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type RealisationsScalarWhereInput = {
    AND?: RealisationsScalarWhereInput | RealisationsScalarWhereInput[]
    OR?: RealisationsScalarWhereInput[]
    NOT?: RealisationsScalarWhereInput | RealisationsScalarWhereInput[]
    id?: IntFilter<"Realisations"> | number
    title?: StringFilter<"Realisations"> | string
    description?: StringFilter<"Realisations"> | string
    location?: StringNullableFilter<"Realisations"> | string | null
    imageUrl?: StringNullableFilter<"Realisations"> | string | null
    videoUrl?: StringNullableFilter<"Realisations"> | string | null
    youtubeUrl?: StringNullableFilter<"Realisations"> | string | null
    link?: StringNullableFilter<"Realisations"> | string | null
    createdAt?: DateTimeFilter<"Realisations"> | Date | string
    updatedAt?: DateTimeFilter<"Realisations"> | Date | string
  }

  export type RealisationsCreateWithoutTagsInput = {
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: RealisationImageCreateNestedManyWithoutRealisationInput
    categories?: CategoryCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    description: string
    location?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
    youtubeUrl?: string | null
    link?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: RealisationImageUncheckedCreateNestedManyWithoutRealisationInput
    categories?: CategoryUncheckedCreateNestedManyWithoutRealisationsInput
  }

  export type RealisationsCreateOrConnectWithoutTagsInput = {
    where: RealisationsWhereUniqueInput
    create: XOR<RealisationsCreateWithoutTagsInput, RealisationsUncheckedCreateWithoutTagsInput>
  }

  export type RealisationsUpsertWithWhereUniqueWithoutTagsInput = {
    where: RealisationsWhereUniqueInput
    update: XOR<RealisationsUpdateWithoutTagsInput, RealisationsUncheckedUpdateWithoutTagsInput>
    create: XOR<RealisationsCreateWithoutTagsInput, RealisationsUncheckedCreateWithoutTagsInput>
  }

  export type RealisationsUpdateWithWhereUniqueWithoutTagsInput = {
    where: RealisationsWhereUniqueInput
    data: XOR<RealisationsUpdateWithoutTagsInput, RealisationsUncheckedUpdateWithoutTagsInput>
  }

  export type RealisationsUpdateManyWithWhereWithoutTagsInput = {
    where: RealisationsScalarWhereInput
    data: XOR<RealisationsUpdateManyMutationInput, RealisationsUncheckedUpdateManyWithoutTagsInput>
  }

  export type RealisationImageCreateManyRealisationInput = {
    id?: number
    url: string
    position?: number
  }

  export type RealisationImageUpdateWithoutRealisationInput = {
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type RealisationImageUncheckedUpdateWithoutRealisationInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type RealisationImageUncheckedUpdateManyWithoutRealisationInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUpdateWithoutRealisationsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutRealisationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyWithoutRealisationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUpdateWithoutRealisationsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutRealisationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutRealisationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RealisationsUpdateWithoutCategoriesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: RealisationImageUpdateManyWithoutRealisationNestedInput
    tags?: TagUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: RealisationImageUncheckedUpdateManyWithoutRealisationNestedInput
    tags?: TagUncheckedUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsUncheckedUpdateManyWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RealisationsUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: RealisationImageUpdateManyWithoutRealisationNestedInput
    categories?: CategoryUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: RealisationImageUncheckedUpdateManyWithoutRealisationNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutRealisationsNestedInput
  }

  export type RealisationsUncheckedUpdateManyWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}