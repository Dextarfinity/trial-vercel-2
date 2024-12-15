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

    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row dense align="center" class="mb-4">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="searchQuery"
              label="Search Shoes"
              outlined
              clearable
              dense
              hide-details
            >
              <template #prepend>
                <v-icon color="#64ccc5">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>

          <v-col lg="2" md="2">
            <v-select
              v-model="costFilter"
              :items="costOptions"
              label="Price"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-btn color="#64CCC5" @click="resetFilters"> Reset Filters </v-btn>
        </v-row>

        <!-- Shoe Cards Section -->
        <v-row dense>
          <v-col v-for="shoe in filteredShoes" :key="shoe.id" cols="12" md="10" lg="4">
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
                <v-icon>{{ shoe.isFavorite ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
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
                <v-btn color="green" dark @click="openModal(shoe)"> View Reviews </v-btn>
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
                <v-btn color="green" text :disabled="!isFormValid" @click="submitReview">
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/supabase";
export default {
  name: "HomePage",
  data() {
    return {
      isFormValid: false,
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      newReview: { review_text: "", rating: null },
      rating: 0,
      drawer: false,
      isModalOpen: false,
      isAddReviewModalOpen: false,
      selectedShoes: null,
      shoes: [], // Initialize the shoes array here
      searchQuery: "",
      costFilter: null,
      costOptions: ["< $199", "$200-$500", "> $500"],
    };
  },

  computed: {
    filteredShoes() {
      return (this.shoes || []).filter((shoe) => {
        const matchesSearchQuery =
          this.searchQuery.trim() === "" ||
          shoe.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          shoe.model.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesCost =
          !this.costFilter ||
          (this.costFilter === "< $199" && shoe.price < 199) ||
          (this.costFilter === "$200-$500" && shoe.price >= 200 && shoe.price <= 500) ||
          (this.costFilter === "> $500" && shoe.price > 500);

        return matchesSearchQuery && matchesCost;
      });
    },
  },

  mounted() {
    this.fetchShoes();
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
    validateForm() {
      if (this.$refs.addReviewForm) {
        this.isFormValid = this.$refs.addReviewForm.validate();
      }
    },
    resetFilters() {
      this.costFilter = "";
    },
    async deleteReview(review) {
      try {
        // Log review ID for debugging
        console.log("Deleting review with ID:", review.id);

        // Direct deletion query
        const { error: deleteError } = await supabase
          .from("user_review")
          .delete()
          .eq("id", review.id); // Match the primary key (id)

        if (deleteError) {
          console.error("Error deleting review:", deleteError);
          alert("Failed to delete review from database.");
        } else {
          // Update the local state after successful deletion
          this.selectedShoes.reviews = this.selectedShoes.reviews.filter(
            (r) => r.id !== review.id
          );
          alert("Review deleted successfully.");
        }
      } catch (err) {
        console.error("Error deleting review:", err.message);
        alert(err.message || "Failed to delete review.");
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
    openModal(shoes) {
      this.selectedShoes = shoes;
      this.fetchReviews(shoes.id);
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

          // Step 1: Get the logged-in user's session and ID
          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser();
          if (authError) throw authError;

          if (!user) {
            console.error("No user logged in.");
            alert("You need to be logged in to submit a review.");
            return;
          }

          console.log("Logged-in user:", user);

          // Step 2: Fetch the user_info ID for the logged-in user
          const { data: userInfo, error: userInfoError } = await supabase
            .from("users_info")
            .select("id")
            .eq("auth_users_id", user.id)
            .single();

          if (userInfoError) throw userInfoError;

          if (!userInfo) {
            console.error("User info not found.");
            alert("User profile information is missing. Please complete your profile.");
            return;
          }

          console.log("Fetched user info ID:", userInfo.id);

          // Step 3: Insert the review into the reviews table
          const { data: reviewData, error: reviewError } = await supabase
            .from("reviews")
            .insert({
              review_text: this.newReview.review_text,
              rating: this.newReview.rating,
              created_at: new Date().toISOString(),
            })
            .select("id")
            .single();

          if (reviewError) {
            console.error("Review insert error:", reviewError);
            alert("Failed to save the review. Please try again.");
            return;
          }

          console.log("Inserted review ID:", reviewData.id);

          // Step 4: Link the review with the shoe and user in the user_review table
          const { error: userReviewError } = await supabase.from("user_review").insert({
            reviews_id: reviewData.id,
            shoes_id: this.selectedShoes?.id,
            users_info_id: userInfo.id,
            created_at: new Date().toISOString(),
          });

          if (userReviewError) {
            console.error("User review link error:", userReviewError);
            alert(
              "Failed to link the review with the shoe and user. Error: " +
                userReviewError.message
            );
            return;
          }

          // Success!
          alert("Review added successfully!");

          // Reset the form and close the modal
          this.newReview = { review_text: "", rating: 0 };
          this.isAddReviewModalOpen = false;

          // Refresh the reviews list
          this.fetchReviews(this.selectedShoes?.id);
        } catch (error) {
          console.error("Unexpected error adding review:", error);
          alert("An unexpected error occurred: " + error.message);
        }
      } else {
        console.log("Form is invalid. Cannot submit review.");
      }
    },
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-size: 0.9rem;
}
</style>
