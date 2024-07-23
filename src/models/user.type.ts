import * as z from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  mail: z.string(),
  phone: z.string(),
  password: z.string(),
  username: z.string(),
  isArchived: z.boolean(),
  createDate: z.coerce.date(),
  userType: z.string(),
  //   address             Address[]
  //   Advertisement       Advertisement[]
  //   ChatMessageReceived ChatMessage[]   @relation("chatReceiver")
  //   ChatMessageSent     ChatMessage[]   @relation("chatSender")
  //   Post                Post[]
  //   Rating              Rating?
  //   UserStore           UserStore?
  //   UserCustomer        UserCustomer?
  //   Image               Image?
});

const UserPostSchema = z.object({
  name: z.string(),
  surname: z.string(),
  mail: z.string(),
  phone: z.string(),
  password: z.string(),
  username: z.string(),
  isArchived: z.boolean(),
  createDate: z.coerce.date(),
  userType: z.string(),
  address: z
    .object({
      city: z.string(),
      flat: z.string(),
      street: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      state: z.string(),
    })
    .optional(),
  //   Advertisement       Advertisement[]
  //   ChatMessageReceived ChatMessage[]   @relation("chatReceiver")
  //   ChatMessageSent     ChatMessage[]   @relation("chatSender")
  //   Post                Post[]
  //   Rating              Rating?
  //   UserStore           UserStore?
  //   UserCustomer        UserCustomer?
  //   Image               Image?
});

const UserPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  mail: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
  isArchived: z.boolean().optional(),
  createDate: z.coerce.date().optional(),
  userType: z.string().optional(),
  address: z
    .object({
      city: z.string(),
      flat: z.string(),
      street: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      state: z.string(),
    })
    .optional(),
  //   Advertisement       Advertisement[]
  //   ChatMessageReceived ChatMessage[]   @relation("chatReceiver")
  //   ChatMessageSent     ChatMessage[]   @relation("chatSender")
  //   Post                Post[]
  //   Rating              Rating?
  //   UserStore           UserStore?
  //   UserCustomer        UserCustomer?
  //   Image               Image?
});

export type User = z.infer<typeof UserSchema>;
export type UserPost = z.infer<typeof UserPostSchema>;
export type UserPut = z.infer<typeof UserPutSchema>;

// model User {
//   id                  String          @id @default(cuid())
//   name                String          @db.VarChar(30)
//   surname             String          @db.VarChar(30)
//   mail                String          @unique @db.Citext
//   phone               String          @db.VarChar(13)
//   password            String          @db.VarChar(16)
//   username            String          @unique @db.Citext
//   isArchived          Boolean         @default(false)
//   createDate          DateTime        @default(now()) //allow first two days to add benefits to get benefit-discount or wait for USBOFFmensual. Only valid the first time.
//   userType            UserType
//   address             Address[]
//   Advertisement       Advertisement[]
//   ChatMessageReceived ChatMessage[]   @relation("chatReceiver")
//   ChatMessageSent     ChatMessage[]   @relation("chatSender")
//   Post                Post[]
//   Rating              Rating?
//   UserStore           UserStore?
//   UserCustomer        UserCustomer?
//   Image               Image?
// }
