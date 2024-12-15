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
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/profile">Profile</v-btn>
      </div>
      <v-btn icon class="d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary color="#176B87">
      <v-list>
        <v-list-item to="/home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Page Content -->
    <v-main>
      <v-container fluid>
        <v-row class="responsive-height">
          <v-col
            cols="12"
            class="d-flex align-center justify-space-between flex-column flex-md-row user-info-section"
          >
            <!-- User Info Left -->
            <div class="d-flex align-center mb-4 mb-md-0">
              <!-- User Avatar -->
              <v-avatar size="98" color="white" class="mr-4">
                <v-icon size="98">mdi-account</v-icon>
              </v-avatar>
              <!-- User Details -->
              <div class="d-block">
                <h4 class="m-0">{{ user.name }}</h4>
                <p class="m-0 text-subtitle-1">{{ user.email }}</p>
                <p class="m-0 text-subtitle-1">{{ user.phone }}</p>
              </div>
            </div>

            <!-- User Actions -->
            <div class="d-flex user-actions">
              <v-btn color="primary" @click="openEditModal"> Edit </v-btn>
              <v-btn color="error" dark @click="logout">Logout</v-btn>
            </div>

            <!-- Edit Profile Modal -->
            <v-dialog v-model="isEditModalOpen" max-width="600">
              <v-card>
                <v-card-title>Edit Profile</v-card-title>
                <v-card-text>
                  <v-form ref="editForm" v-model="isFormValid">
                    <v-text-field
                      v-model="editData.fullname"
                      label="Full Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editData.phone"
                      label="Phone Number"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="isEditModalOpen = false">Cancel</v-btn>
                  <v-btn color="primary" text @click="saveProfile">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <!-- Right: Favorite Shoes Section -->
          <v-col cols="12" md="12" class="recipe-section">
            <div class="recipe-container">
              <v-row dense>
                <v-col
                  v-for="shoe in filteredShoes"
                  :key="shoe.id"
                  cols="12"
                  md="10"
                  lg="4"
                >
                  <v-card
                    class="pa-4"
                    outlined
                    style="background-color: #94a3b8; position: relative"
                  >
                    <!-- Heart button in the top-right corner -->
                    <v-btn
                      icon
                      color="red"
                      class="absolute top-right"
                      @click="toggleFavorite(shoe)"
                    >
                      <v-icon>{{
                        shoe.isFavorite ? "mdi-heart" : "mdi-heart-outline"
                      }}</v-icon>
                    </v-btn>

                    <!-- Add the photo above the attributes -->
                    <v-img
                      :src="shoe.image_url"
                      alt="Shoe Image"
                      height="200"
                      class="mb-4"
                    ></v-img>

                    <v-card-title
                      class="font-weight-bold d-flex align-center justify-space-between"
                    >
                    </v-card-title>

                    <v-card-text>
                      <!-- Shoe attributes -->
                      <div><strong>Brand:</strong> {{ shoe.brand }}</div>
                      <div><strong>Model:</strong> {{ shoe.model }}</div>
                      <div><strong>Category:</strong> {{ shoe.category }}</div>
                      <div><strong>Price:</strong> ${{ shoe.price }}</div>
                      <div><strong>Release Date:</strong> {{ shoe.release_date }}</div>
                      <div><strong>Description:</strong> {{ shoe.description }}</div>
                    </v-card-text>

                    <div class="d-flex justify-space-evenly mt-4">
                      <v-btn color="green" dark @click="openModal(shoe)">
                        View Reviews
                      </v-btn>
                      <v-btn color="blue" dark @click="openAddReviewModal(shoe)">
                        Add Review
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>

                <!-- Modal for reviews -->
                <v-dialog v-model="isModalOpen" max-width="600px">
                  <v-card>
                    <v-card-title class="font-weight-bold">
                      Reviews for {{ selectedShoes?.brand }}
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col
                          v-for="review in selectedShoes?.reviews || []"
                          :key="review.id"
                          cols="12"
                        >
                          <div class="mb-2">
                            <strong>{{ review.name }}</strong>
                          </div>
                          <v-row>
                            <v-col cols="12" class="mt-2">
                              <strong>Comment:</strong> {{ review.review_text }}
                            </v-col>
                            <div style="display: flex; align-items: center; gap: 8px">
                              <strong class="mx-3">Ratings:</strong>
                              <v-rating
                                v-model="review.rating"
                                color="yellow"
                                half-increments
                                readonly
                              ></v-rating>
                            </div>
                          </v-row>
                          <v-btn color="red" dark small @click="deleteReview(review)">
                            Delete
                          </v-btn>
                          <v-divider class="mt-4"></v-divider>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text color="red" @click="isModalOpen = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- Modal for adding a review -->
                <v-dialog v-model="isAddReviewModalOpen" max-width="600px">
                  <v-card>
                    <v-card-title class="font-weight-bold">
                      Add Review for {{ selectedShoes?.brand }}
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="addReviewForm" v-model="isFormValid">
                        <!-- Text Field for Review -->
                        <v-text-field
                          v-model="newReview.review_text"
                          :rules="[rules.required]"
                          label="Comment"
                          outlined
                          dense
                          @input="validateForm"
                        ></v-text-field>

                        <!-- Rating -->
                        <div style="display: flex; align-items: center; gap: 8px">
                          Selected Rating: {{ newReview.rating }}
                          <v-rating
                            v-model="newReview.rating"
                            color="yellow darken-3"
                            background-color="grey lighten-1"
                            half-increments
                            large
                            :rules="[rules.required]"
                            @change="validateForm"
                          ></v-rating>
                        </div>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="green"
                        text
                        :disabled="!isFormValid"
                        @click="submitReview"
                      >
                        Submit
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn text color="red" @click="isAddReviewModalOpen = false">
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/supabase";

export default {
  name: "ProfilePage",
  data() {
    return {
      drawer: false,
      isModalOpen: false,
      isAddReviewModalOpen: false,
      isEditModalOpen: false,
      isFormValid: false,
      newReview: { review_text: "", rating: 0 },
      favoriteShoes: [], // Array to store favorite shoes
      filteredShoes: [], // Add this if missing
      editData: {
        name: "",
        phone: "",
      },
      user: {
        name: "",
        phone: "",
        email: "",
      },
      dialog: {
        visible: false,
        field: "",
        value: "",
        userId: null,
      },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      searchQuery: "",
      selectedShoes: {
        reviews: [], // Initialize reviews as an empty array
        brand: "", // Add brand property if used
      },
    };
  },

  mounted() {
    this.fetchUserDetails();
    this.fetchShoes();
    this.fetchFavoriteShoes();
  },

  methods: {
    async toggleFavorite(shoes) {
      try {
        // Step 1: Fetch the logged-in user's session
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Error fetching authenticated user:", authError);
          alert("Please log in to toggle favorites.");
          return;
        }

        console.log("Logged-in user:", user);

        // Step 2: Fetch the user's `users_info` ID
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", user.id)
          .single();

        if (userInfoError || !userInfo?.id) {
          console.error("Failed to fetch user info:", userInfoError);
          alert("Failed to fetch user profile. Please ensure your profile is complete.");
          return;
        }

        console.log("Fetched user info ID:", userInfo.id);

        if (shoes.isFavorite) {
          // Step 3: Remove from favorites
          const { error: userFavoriteError } = await supabase
            .from("user_favorites")
            .delete()
            .eq("shoes_id", shoes.id)
            .eq("users_info_id", userInfo.id);

          if (userFavoriteError) {
            console.error("Error removing favorite:", userFavoriteError);
            alert("Failed to remove favorite.");
            return;
          }

          console.log(`Removed shoe ID ${shoes.id} from favorites.`);
        } else {
          // Step 3a: Add to the `favorites` table
          const { data: favorite, error: favoriteError } = await supabase
            .from("favorites")
            .insert({
              shoe_brand: shoes.brand, // Include necessary fields for your `favorites` table
            })
            .select("id") // Return the inserted record's ID
            .single();

          if (favoriteError || !favorite) {
            console.error("Error inserting into favorites table:", favoriteError);
            alert("Failed to add to favorites.");
            return;
          }

          console.log("Inserted into favorites table:", favorite.id);

          // Step 3b: Link to `user_favorites`
          const { error: userFavoriteError } = await supabase
            .from("user_favorites")
            .insert({
              shoes_id: shoes.id,
              users_info_id: userInfo.id,
              favorites_id: favorite.id, // Link to the `favorites` table entry
              created_at: new Date().toISOString(),
            });

          if (userFavoriteError) {
            console.error("Error linking favorite to user:", userFavoriteError);
            alert("Failed to link favorite.");
            return;
          }

          console.log(`Linked favorite ID ${favorite.id} to user.`);
        }

        // Step 4: Toggle favorite state
        shoes.isFavorite = !shoes.isFavorite;

        alert(
          shoes.isFavorite
            ? "Added to favorites successfully!"
            : "Removed from favorites successfully!"
        );
      } catch (error) {
        console.error("Unexpected error toggling favorite:", error);
        alert("An unexpected error occurred.");
      }
    },
    async fetchFavoriteShoes() {
      try {
        // Step 1: Get the logged-in user's session
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Error fetching authenticated user:", authError);
          alert("Please log in to view your favorite shoes.");
          return;
        }

        console.log("Logged-in user:", user);

        // Step 2: Fetch the user's `users_info` ID
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", user.id)
          .single();

        if (userInfoError || !userInfo?.id) {
          console.error("Failed to fetch user info:", userInfoError);
          alert("Failed to fetch user profile. Please ensure your profile is complete.");
          return;
        }

        console.log("Fetched user info ID:", userInfo.id);

        // Step 3: Fetch favorite shoe IDs from `user_favorites`
        const { data: userFavorites, error: favoritesError } = await supabase
          .from("user_favorites")
          .select("shoes_id")
          .eq("users_info_id", userInfo.id);

        if (favoritesError || !userFavorites?.length) {
          console.warn(
            "No favorite shoes found or error fetching favorites:",
            favoritesError
          );
          this.filteredShoes = []; // Clear the filtered shoes if no favorites
          return;
        }

        console.log("User's favorite shoe IDs:", userFavorites);

        // Step 4: Fetch the details of the favorite shoes from the `shoes` table
        const shoeIds = userFavorites.map((fav) => fav.shoes_id); // Extract shoe IDs
        const { data: favoriteShoes, error: shoesError } = await supabase
          .from("shoes")
          .select("*")
          .in("id", shoeIds);

        if (shoesError || !favoriteShoes?.length) {
          console.warn("Error fetching shoes or no favorite shoes found:", shoesError);
          this.filteredShoes = []; // Clear the filtered shoes if fetch fails
          return;
        }

        console.log("Favorite shoes fetched:", favoriteShoes);

        // Step 5: Update the filteredShoes array and mark these as favorites
        this.filteredShoes = favoriteShoes.map((shoe) => ({
          ...shoe,
          isFavorite: true,
        }));

        console.log(this.filteredShoes.map((shoe) => shoe.id));

        console.log("Filtered shoes updated:", this.filteredShoes);
      } catch (error) {
        console.error("Unexpected error fetching favorite shoes:", error.message);
        alert("Failed to fetch favorite shoes. Please try again.");
      }
    },
    async deleteReview(review) {
      try {
        // Log review ID for debugging
        console.log("Deleting review with ID:", review.id);

        // Direct deletion query
        const { error: deleteError } = await supabase
          .from("user_ratings")
          .delete()
          .eq("id", review.id); // Match the primary key (id)

        if (deleteError) {
          console.error("Error deleting review:", deleteError);
          alert("Failed to delete review from database.");
        } else {
          // Update the local state after successful deletion
          this.selectedRecipe.reviews = this.selectedRecipe.reviews.filter(
            (r) => r.id !== review.id
          );
          alert("Review deleted successfully.");
        }
      } catch (err) {
        console.error("Error deleting review:", err.message);
        alert(err.message || "Failed to delete review.");
      }
    },
    openEditModal() {
      // Populate modal with current user data
      this.editData.fullname = this.user.name;
      this.editData.phone = this.user.phone;
      this.isEditModalOpen = true;
    },
    async saveProfile() {
      if (this.isFormValid) {
        try {
          // Update user info in Supabase
          await this.updateUserInfo(this.editData);
          // Update local user data
          this.user.name = this.editData.fullname;
          this.user.phone = this.editData.phone;
          this.isEditModalOpen = false;
        } catch (error) {
          console.error("Failed to update user info:", error);
        }
      }
    },
    async updateUserInfo(data) {
      try {
        // Step 1: Fetch the currently logged-in user
        const { data: userResponse, error: userError } = await supabase.auth.getUser();
        if (userError || !userResponse?.user?.id) {
          throw new Error("Failed to fetch user ID.");
        }

        const userId = userResponse.user.id;

        // Step 2: Update the user info in the `users_info` table
        const { error } = await supabase
          .from("users_info")
          .update({
            name: data.fullname,
            phone_number: data.phone,
          })
          .eq("auth_users_id", userId);

        if (error) {
          throw error;
        }

        alert("User info successfully updated!");
        window.onload = () => {
          location.reload(); // Refresh the page when it loads
        };
      } catch (error) {
        console.error("Error updating user info in Supabase:", error.message);
        throw error; // Re-throw the error to handle it in the caller function
      }
    },
    async fetchShoes() {
      try {
        // Step 1: Fetch all shoes from the "shoes" table, including the photo field
        const { data: shoes, error: shoesError } = await supabase.from("shoes").select(`
      id,
      brand,
      model,
      category,
      price,
      description,
      release_date,
      image_url
    `);

        if (shoesError) throw shoesError;

        // Step 2: Fetch all user favorites
        const { data: favorites, error: favoritesError } = await supabase
          .from("user_favorites")
          .select("shoes_id");

        if (favoritesError) throw favoritesError;

        // Step 3: Mark each shoe as favorite if it exists in the favorites list
        const favoriteIds = favorites.map((fav) => fav.shoes_id);
        this.shoes = shoes.map((shoe) => ({
          ...shoe,
          isFavorite: favoriteIds.includes(shoe.id),
        }));

        // Filter shoes based on search query
        this.filteredShoes = this.shoes.filter((shoe) =>
          shoe.brand.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } catch (error) {
        console.error("Error fetching shoes or favorites:", error.message);
        alert("Failed to fetch shoes or favorites. Please try again.");
      }
    },
    async fetchUserDetails() {
      try {
        // Fetch the authenticated user
        const { data: userResponse, error: userError } = await supabase.auth.getUser();
        if (userError) throw new Error(`Auth Error: ${userError.message}`);

        const user = userResponse.user;

        if (!user) throw new Error("No authenticated user found.");

        // Fetch user details from the database
        const { data: userDetails, error: detailsError } = await supabase
          .from("users_info")
          .select("name, email, phone_number")
          .eq("auth_users_id", user.id);

        if (detailsError) throw new Error(`Database Error: ${detailsError.message}`);
        if (!userDetails || userDetails.length === 0) {
          throw new Error("No user details found for the given auth ID.");
        }
        if (userDetails.length > 1) {
          throw new Error("Multiple user details found; please verify the database.");
        }

        const userInfo = userDetails[0];

        // Update local user object
        this.user.name = userInfo.name;
        this.user.email = userInfo.email;
        this.user.phone = userInfo.phone_number;
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    },
    openModal(recipe) {
      this.selectedRecipe = recipe;
      this.fetchReviews(recipe.id);
      this.isModalOpen = true;
    },

    async fetchReviews(shoeId) {
      try {
        // Fetch reviews from user_review table with related data
        const { data, error } = await supabase
          .from("user_review")
          .select(
            `
        id,
        created_at,
        reviews_id (
          review_text,
          rating
        ),
        users_info (
          name
        )
      `
          )
          .eq("shoes_id", shoeId);

        if (error) throw error;

        if (!data || data.length === 0) {
          console.log("No reviews found for this shoe.");
          this.selectedShoes.reviews = [];
          return;
        }

        console.log("Fetched reviews data:", data);

        // Map the fetched data to format reviews
        this.selectedShoes.reviews = data.map((review) => ({
          id: review.id,
          created_at: review.created_at,
          review_text: review.reviews_id?.review_text || "No review text provided",
          rating: review.reviews_id?.rating || 0,
          name: review.users_info?.name || "Anonymous",
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        alert("Failed to fetch reviews. Please try again.");
      }
    },

    openAddReviewModal(shoes) {
      this.selectedShoes = shoes;
      this.isAddReviewModalOpen = true;
    },

    async submitReview() {
      if (this.isFormValid) {
        try {
          console.log("Submitting review with:", this.newReview);

          // Insert into reviews table
          const { data: reviewData, error: reviewError } = await supabase
            .from("reviews")
            .insert({
              review_text: this.newReview.review_text,
              rating: this.newReview.rating,
              created_at: new Date().toISOString(), // Explicitly set created_at
            })
            .select("id")
            .single();

          if (reviewError) {
            console.error("Review insert error:", reviewError);
            alert("Failed to save the review. Error: " + reviewError.message);
            return;
          }

          console.log("Inserted review ID:", reviewData.id);

          // Link review with the shoe in user_review table
          const { error: userReviewError } = await supabase.from("user_review").insert({
            reviews_id: reviewData.id,
            shoes_id: this.selectedShoes.id,
          });

          if (userReviewError) {
            console.error("User review link error:", userReviewError);
            alert(
              "Failed to link the review with the shoe. Error: " + userReviewError.message
            );
            return;
          }

          alert("Review added successfully!");

          // Reset the form and close the modal
          this.newReview = { review_text: "", rating: 0 };
          this.isAddReviewModalOpen = false;

          // Refresh the reviews list
          this.fetchReviews(this.selectedShoes.id);
        } catch (error) {
          console.error("Unexpected error adding review:", error);
          alert("An unexpected error occurred: " + error.message);
        }
      } else {
        console.log("Form is invalid. Cannot submit review.");
      }
    },

    async logout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        this.$router.push("/login");
        console.log("User logged out successfully.");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.profile-avatar {
  margin-bottom: 20px;
}
.profile-info p,
.profile-info h4 {
  margin: 0;
}
.profile-section {
  background-color: #f4f4f4;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.profile-sidebar {
  width: 100%;
  padding-top: 100px;
}

.profile-avatar {
  margin-bottom: 16px;
}

.logout-button {
  margin-top: 16px;
  width: 100%;
}
/* For modern browsers (hide scrollbar visually) */
.v-application::-webkit-scrollbar {
  display: none; /* Hide scrollbar for WebKit browsers */
}

.v-application {
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.recipe-section {
  height: 100%; /* Ensure it takes full column height */
}

.recipe-container {
  height: calc(100% - 32px); /* Adjust for padding if necessary */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 16px; /* Add padding for aesthetics */
  background-color: #fff; /* Optional: Set background for clarity */
  border-radius: 8px; /* Optional: Rounded edges */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
}

/* Hide scrollbar (optional) */
.recipe-container::-webkit-scrollbar {
  display: none;
}

.recipe-container {
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}
.responsive-height {
  height: 90vh;
}

@media (max-width: 600px) {
  /* Adjust breakpoint as needed */
  .responsive-height {
    height: 60vh;
  }
  .profile-sidebar {
    padding-top: 0px;
  }
  .text-small {
    font-size: 0.8rem;
  }
}
.user-actions {
  gap: 16px; /* Adjust the gap size as needed */
}
</style>
