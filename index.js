


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

function createLoginTracker(user) {
  const correctUsername = user.username;
  const correctPassword = user.password;

  let failedAttempts = 0;
  const maxAttempts = 3;
  let isLocked = false;

  //Nested login function//
  const login = (password) => {
    if (isLocked) {
      return "Account locked due to too many failed login attempts";
    }
    
    if (password === correctPassword) {
      failedAttempts = 0;
      return "Login successful";
    }
    
      failedAttempts++;

      if (failedAttempts === maxAttempts) {
        isLocked = true;
        return `Attempt ${failedAttempts}: Login failed`;
    } else if (failedAttempts === maxAttempts) {
      isLocked = true;
      return `Attempt ${failedAttempts}: Login failed`;
    }
    if (failedAttempts < maxAttempts) {
return `Attempt ${failedAttempts}: Login failed`;
    }
      return "Account locked due to too many failed login attempts";
    };

  return login;
}

//testing out //
if (require.main === module) {
  const user1 = { username: "user1", password: "password123" };
  const login1 = createLoginTracker(user1);

  console.log("User1 Test:");
  console.log(login1("wrong"));
  console.log(login1("wrongagain"));
  console.log(login1("wrongagain"));
  console.log(login1("wrongagain"));
  console.log(login1("password123"));

  console.log("\n New User (should succed immediately):");
  const user2 = { username: "john_smith_24", password: "securePassword" };
  const login2 = createLoginTracker(user2);
  console.log(login2("securePassword"));

  console.log("\n Failed once then correct password:");
  const user3 = { username: "jane_Smith_4", password: "password45!" };
  const login3 = createLoginTracker(user3);
  console.log(login3("wrongpassword"));
  console.log(login3("password45!"));
}

