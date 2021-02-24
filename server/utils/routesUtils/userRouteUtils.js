const s3 = require('../s3Util');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}

async function getProfileImage(id) {

  try {
    if (s3.config) {
      const params = {
        Bucket: s3.config.bucket, // pass your bucket name
        Key: `uploads/profiles/${id}.jpg`, // key for saving filename
      };

      const getImage = await s3.s3.getObject(params).promise();
      let image = 'data:image/(png|jpg);base64,' + encode(getImage.Body);
      return image;
    } else {
      return 'data:image/gif;base64,R0lGODdh+gD6APEAAJCQkNDQ0LCwsAAAACwAAAAA+gD6AAAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoOEhYaHiImKioJNAI8AgZGdkosOjlKJmpqdloSYW5GSoq2em5BDqaqgpQakoksBory+oaNHs7W8uDy5ura9Mb7PsLAyt8vFpJzGKM7KyqvHzyTB0rXdJcrS0afe2RvR3O6e0hbj5KrgF+zj6ZbrHeLk/7LhE/L99dz3CPn7/foJ+/fwATCBxIsGCAgwgT7mPY0OG7iBQlAayIEVK9jP8cAaSD2JGdvl8gQ4q8ZrKjtJIpz4001bLjy0UxQ+piWdNlrZw2TeHkaW6mIaA9F/0kKk7oIKRFER1lGk4pIKhNCz2luk1qn6tYq2nl01WlIa5hqX3NQ7ass7N41HK06jYj2zpp4x6bS8duRkJ6MQ6q2zcY3jiAA/MaDKew4VuI3yymKOhxxMiSEVKu7C+QYszJAG3mnKoxm8+guXkuPU/0GtKox/1h3ZrU6dg6X9Ou7Qf2bXq5dyed7VubajW6bw9XE3zb5eTPljNH5vy5sOjSewkq3vo48ep3l3IPxve7de/icRHCDlo7m/K3hrKXNfZ9Z/fy0R2qn8op/lDqHe//16TIfwAGKKBGNBX4iCXo9dWfHAj6JGCDcwioy34k1SehHfUtsyBWGd7RIVMftiUeOSEC9c6JNY24h4opsQgWcwolp5ABvtV4wG04IhAbjOGBtuMCQAYpZGVEBrSYjwoGpiRMdh1JgVtNXtjVlBxCZaU3SEH5gYuxZPnQi1ya8NaYKXgJppkLSaSmC6yl2eYDqDAGZ5wXUEIJK6zgaWeffv4JaKCCDkpooYYeimiiii7KaKOOPgoplHgieBclacxJaVR10oBppvlsyoyXnmYCqgmijsrfE6eiCg0jrCJV6p2vUhXrBLOGBcSqtwrGg667doeDr78CW8OwgXFqrGGbxgqbrFkvNGskC9BitsK0nKVg7ZAlZFvattx2K8K3rYXArLi4cVCuuedqoG5sHbRL2wbpwrsuBfPSW68E+OoIz778TnCvv/k2IPBuABdsnL4I/+tAwAsHBcHDBjcsccIEV8ywQRhbrMDGE3fscbwKOBxyVCCX7G4CKIt8AMkrC8fjyynbKPO4BrhcMzUt54yaMjzb/DNqNAd9Lc5EV3o0Z50mzSDTTj8NddRST0111VZfjXXWWm/Ndddefw122GKPTXbZZnNWAAA7';
    }
  } catch (e) {
    return 'data:image/gif;base64,R0lGODdh+gD6APEAAJCQkNDQ0LCwsAAAACwAAAAA+gD6AAAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoOEhYaHiImKioJNAI8AgZGdkosOjlKJmpqdloSYW5GSoq2em5BDqaqgpQakoksBory+oaNHs7W8uDy5ura9Mb7PsLAyt8vFpJzGKM7KyqvHzyTB0rXdJcrS0afe2RvR3O6e0hbj5KrgF+zj6ZbrHeLk/7LhE/L99dz3CPn7/foJ+/fwATCBxIsGCAgwgT7mPY0OG7iBQlAayIEVK9jP8cAaSD2JGdvl8gQ4q8ZrKjtJIpz4001bLjy0UxQ+piWdNlrZw2TeHkaW6mIaA9F/0kKk7oIKRFER1lGk4pIKhNCz2luk1qn6tYq2nl01WlIa5hqX3NQ7ass7N41HK06jYj2zpp4x6bS8duRkJ6MQ6q2zcY3jiAA/MaDKew4VuI3yymKOhxxMiSEVKu7C+QYszJAG3mnKoxm8+guXkuPU/0GtKox/1h3ZrU6dg6X9Ou7Qf2bXq5dyed7VubajW6bw9XE3zb5eTPljNH5vy5sOjSewkq3vo48ep3l3IPxve7de/icRHCDlo7m/K3hrKXNfZ9Z/fy0R2qn8op/lDqHe//16TIfwAGKKBGNBX4iCXo9dWfHAj6JGCDcwioy34k1SehHfUtsyBWGd7RIVMftiUeOSEC9c6JNY24h4opsQgWcwolp5ABvtV4wG04IhAbjOGBtuMCQAYpZGVEBrSYjwoGpiRMdh1JgVtNXtjVlBxCZaU3SEH5gYuxZPnQi1ya8NaYKXgJppkLSaSmC6yl2eYDqDAGZ5wXUEIJK6zgaWeffv4JaKCCDkpooYYeimiiii7KaKOOPgoplHgieBclacxJaVR10oBppvlsyoyXnmYCqgmijsrfE6eiCg0jrCJV6p2vUhXrBLOGBcSqtwrGg667doeDr78CW8OwgXFqrGGbxgqbrFkvNGskC9BitsK0nKVg7ZAlZFvattx2K8K3rYXArLi4cVCuuedqoG5sHbRL2wbpwrsuBfPSW68E+OoIz778TnCvv/k2IPBuABdsnL4I/+tAwAsHBcHDBjcsccIEV8ywQRhbrMDGE3fscbwKOBxyVCCX7G4CKIt8AMkrC8fjyynbKPO4BrhcMzUt54yaMjzb/DNqNAd9Lc5EV3o0Z50mzSDTTj8NddRST0111VZfjXXWWm/Ndddefw122GKPTXbZZnNWAAA7';
  }
}
async function createPasswordHash(ctx, next) {
  if (ctx.request.body.user.password) {
    const hash = await bcrypt.hash(ctx.request.body.user.password, 10);

    delete ctx.request.body.user.password;
    ctx.request.body.user.hash = hash;
  }
  await next();
}

async function getGoogleToken(ctx, next) {
  if (ctx.request.body.user.username == 'google'){
    const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + ctx.request.body.user.password);

    const body = await response.text();
    console.log(body);
    console.log('\tsent token');
    ctx.request.body.user.email = body.email;
    // const userId = response.user_id;
    // const userEmail = response.email;
    // ctx.body = {
    //   token: jsonwebtoken.sign({
    //     data: { userId: userId, email: userEmail },
    //     exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
    //   }, secret)
    // };
  }
  await next();
}

module.exports = {
  createPasswordHash,
  getProfileImage,
  getGoogleToken
};