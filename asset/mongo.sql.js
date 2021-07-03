// Permission
db.permissioncodes.insertOne(
  {
    _id: ObjectId('60dd7c5321af8b99ec1338f8'),
    code: 'USER_CONTRIBUTRO',
    desc: 'Change user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { session: null }
);
db.permissioncodes.insertOne(
  {
    _id: ObjectId('60dd7c762cbbca512481286b'),
    code: 'USER_AUDITOR',
    desc: 'View user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { session: null }
);
db.permissioncodes.insertOne(
  {
    _id: ObjectId('60dd7c5321af8b99ec1338fa'),
    code: 'ROLE_CONTRIBUTRO',
    desc: 'Change role',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { session: null }
);
db.permissioncodes.insertOne(
  {
    _id: ObjectId('60e04435af528865d0356245'),
    code: 'ROLE_AUDITOR',
    desc: 'View role',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { session: null }
);
db.permissioncodes.insertOne(
  {
    _id: ObjectId('60dd7d327f9d281638ea7394'),
    code: 'PERMI_CONTRIBUTRO',
    desc: 'Change permissioncode',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { session: null }
);
db.permissioncodes.insertOne(
  {
    _id: ObjectId('60dd7eed0b12bf8054135627'),
    code: 'RPERMI_AUDITOR',
    desc: 'View permissioncode',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { session: null }
);


// Roles
db.roles.insertOne({
  permissionCodes: [
    ObjectId('60dd7c5321af8b99ec1338f8'),
    ObjectId('60dd7c5321af8b99ec1338fa'),
    ObjectId('60dd7d327f9d281638ea7394'),
    ObjectId('60dd7c762cbbca512481286b'),
    ObjectId('60e04435af528865d0356245'),
    ObjectId('60dd7eed0b12bf8054135627'),
  ],
  status: 'ACTIVE',
  _id: ObjectId('60e0a1ace3924b9e7c65d643'),
  name: 'admin',
  desc: 'Grants full access to manage all resources, including the ability to assign db.roles',
  createdAt: new Date(),
  updatedAt: new Date(),
});
db.roles.insertOne({
  permissionCodes: [
    ObjectId('60dd7c762cbbca512481286b'),
    ObjectId('60e04435af528865d0356245'),
    ObjectId('60dd7eed0b12bf8054135627'),
  ],
  status: 'ACTIVE',
  _id: ObjectId('60e0a1ace3924b9e7c65d645'),
  name: 'auditor',
  desc: 'View all resources, but does not allow you to make any changes.',
  createdAt: new Date(),
  updatedAt: new Date(),
});
db.roles.insertOne({
  permissionCodes: [ObjectId('60dd7c5321af8b99ec1338fa'), ObjectId('60dd7d327f9d281638ea7394')],
  status: 'ACTIVE',
  _id: ObjectId('60e0a1ace3924b9e7c65d648'),
  name: 'contributor',
  desc: 'Grants full access to manage all resources, but does not allow you to assign roles',
  createdAt: new Date(),
  updatedAt: new Date(),
});


// Users
db.users.insertOne(
  {
    email: 'jeff@123.com',
    roles: [ObjectId('60e0a1ace3924b9e7c65d645')],
    status: 'ACTIVE',
    _id: ObjectId('60e0a3c73da219943cd8491e'),
    username: 'jeff',
    password: 'cSK7MKHChPmWA0f0LpTQduFwmLSM2hM4dqPtjt3BZsYm+zL34Y2r4urr2d5dPgdy7ke2zcL6vQjssJzGzmAnUw==',
    displayName: 'jeff5',
    provider: 'LOCAL;',
    createdAt: new Date(),
    updatedAt: new Date(),
    salt: 'rhEuvGFEC7qRGjxwVRo3Ig==',
  },
  { session: null }
);


db.users.insertOne(
  {
    email: 'admin@123.com',
    roles: [ObjectId('60e0a1ace3924b9e7c65d643')],
    status: 'ACTIVE',
    _id: ObjectId('60e0a4bc3da219943cd84920'),
    username: 'matthew',
    password: 'gNZwimHOECpF6e0y03wvBWqwnUeVKaXtK3nDT2yLZM23vkQYMSin0AM7oJ7ix739Ax3FaGPPlzCvqu1RFpeQxA==',
    displayName: 'pengma',
    provider: 'LOCAL;',
    createdAt: new Date(),
    updatedAt: new Date(),
    salt: 'oGMGrbt9lOb2JbyauvmQKA==',
  },
  { session: null }
);

