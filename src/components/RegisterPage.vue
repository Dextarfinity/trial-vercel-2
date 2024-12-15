<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app color="#176B87" elevate-on-scroll sticky>
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="#053b50">mdi-shoe-sneaker</v-icon>
          <span class="font-weight-bold" style="color: #64ccc5; margin-left: 8px">
            SoleScore
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Signup</v-btn>
      </div>
      <v-btn icon class="d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary color="#176B87">
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item to="/register">
          <v-list-item-title>Signup</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="d-flex align-center justify-center min-vh-100">
        <v-row>
          <v-col cols="12" class="text-center mb-5">
            <!-- Logo and Title -->
            <v-icon size="48" color="#64ccc5">mdi-shoe-sneaker</v-icon>
            <h1 class="text-h4 font-weight-bold" style="color: white">
              Welcome to SoleScore
            </h1>
          </v-col>

          <v-row class="d-flex justify-center align-center">
            <v-col cols="12" sm="8" md="6" lg="4">
              <v-card
                class="py-4 mx-auto"
                style="
                  background-color: #ffffff;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                "
              >
                <v-card-title
                  class="text-h5 d-flex justify-center"
                  style="color: #3e4e3a"
                >
                  Register
                </v-card-title>

                <v-card-text>
                  <v-form @submit.prevent="register">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      type="email"
                      required
                      outlined
                      color="#053b50"
                    ></v-text-field>
                    <v-text-field
                      v-model="name"
                      label="Full Name"
                      required
                      outlined
                      color="#053b50"
                    ></v-text-field>
                    <v-text-field
                      v-model="phone_number"
                      label="Phone Number"
                      type="tel"
                      required
                      outlined
                      color="#053b50"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      required
                      outlined
                      color="#053b50"
                    ></v-text-field>
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                      outlined
                      color="#053b50"
                    ></v-text-field>

                    <v-btn type="submit" color="#053b50" block rounded> Register </v-btn>
                  </v-form>
                  <v-btn text to="/login" class="mt-5">
                    Already have an account? Login back!
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/supabase";

export default {
  name: "RegisterPage",
  data() {
    return {
      drawer: false, // Controls the visibility of the sidebar
      email: "",
      name: "", // Now labeled as "Full Name" in the form
      phone_number: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        // Step 1: Sign up the user in auth.users
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        const userId = data.user.id; // Get the newly created user's ID

        // Step 2: Insert additional user details into users_info
        const { error: userInfoError } = await supabase.from("users_info").insert({
          name: this.name,
          email: this.email,
          phone_number: this.phone_number,
          auth_users_id: userId,
          created_at: new Date().toISOString(), // Ensure created_at is populated
        });

        if (userInfoError) throw userInfoError;

        alert("Registration successful!");

        // Redirect to login page
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during registration:", error.message);
        alert("Registration failed: " + error.message);
      }
    },
  },
};
</script>
