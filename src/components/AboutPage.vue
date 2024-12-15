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

    <!-- Page Content -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-toolbar-title class="text-center" style="width: 100%">
              <div class="d-flex justify-center align-center" style="line-height: 1.2">
                <v-icon size="30" color="primary" style="margin-right: 8px"
                  >mdi-shoe-sneaker</v-icon
                >
                <span
                  class="font-weight-bold primary--text"
                  style="
                    margin-left: 8px;
                    font-size: 2.5rem;
                    line-height: 1.2;
                    white-space: nowrap;
                  "
                >
                  SoleScore
                </span>
              </div>
            </v-toolbar-title>

            <h1 class="text-center font-weight-bold mb-6 primary--text">
              Rate, Review, and Discover Amazing Shoes!
            </h1>
            <p class="text-center mb-10" style="font-size: 1.2rem; color: #5d6f61">
              Join our community of passionate shoe enthusiasts. Share your experiences,
              rate your favorite kicks, and discover new styles that match your taste and
              lifestyle.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Rate & Review</v-card-title>
              <v-card-text>
                Share your thoughts on the latest releases or your all-time favorites. Our
                detailed rating system covers comfort, style, durability, and value for
                money, helping others make informed decisions.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Discover Trends</v-card-title>
              <v-card-text>
                Stay up-to-date with the hottest trends in footwear. From street style to
                high fashion, running shoes to dress shoes, our community-driven platform
                showcases the most popular and highly-rated shoes across all categories.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold"
                >Personalized Recommendations</v-card-title
              >
              <v-card-text>
                Get shoe suggestions tailored to your preferences. Our algorithm analyzes
                your ratings and reviews to recommend shoes you're likely to love, helping
                you discover new brands and styles.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Compare & Contrast</v-card-title>
              <v-card-text>
                Can't decide between two pairs? Use our comparison tool to see how they
                stack up in different categories. View side-by-side ratings and read user
                reviews to make the best choice for your needs.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Shoe Collections</v-card-title>
              <v-card-text>
                Curate and showcase your personal shoe collection. Share your prized
                possessions, track your wish list, and connect with other collectors who
                share your passion for footwear.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <v-card-title class="font-weight-bold">Expert Reviews</v-card-title>
              <v-card-text>
                Gain insights from seasoned shoe experts and industry professionals. Our
                platform features in-depth reviews and analysis from experienced
                reviewers, providing a comprehensive look at the latest releases and
                timeless classics.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <p style="font-size: 1.1rem; color: #5d6f61">
              SoleScore is your go-to destination for honest shoe reviews, ratings, and
              recommendations. Join our community today and step into a world of shoe
              enthusiasm!
            </p>
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey lighten-1"
              half-increments
              hover
              large
            ></v-rating>
          </v-col>
        </v-row>

        <v-row class="mt-8">
          <v-col cols="12">
            <h2 class="text-center font-weight-bold mb-6 primary--text">
              What Our Users Say
            </h2>
            <v-carousel cycle height="150" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item v-for="(testimonial, i) in testimonials" :key="i">
                <v-sheet
                  height="100%"
                  color="grey lighten-4"
                  class="d-flex flex-column justify-center align-center"
                >
                  <div class="text-h5 text-center px-12">"{{ testimonial.text }}"</div>
                  <div class="mt-4 text-subtitle-1 font-weight-bold">
                    {{ testimonial.author }}
                  </div>
                  <div class="text-subtitle-2">
                    {{ testimonial.role }}
                  </div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="#176B87" app>
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="4" class="text-white text-center text-md-left">
            <p>&copy; {{ new Date().getFullYear() }} SoleScore. All Rights Reserved.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon color="white">mdi-facebook</v-icon>
            <v-icon color="white" class="mx-3">mdi-twitter</v-icon>
            <v-icon color="white">mdi-instagram</v-icon>
          </v-col>
          <v-col cols="12" md="4" class="text-white text-center text-md-right">
            <p>Privacy Policy | Terms of Service</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Controls the sidebar drawer visibility
      rating: 5,
      testimonials: [
        {
          text:
            "SoleScore has completely changed how I shop for shoes. The community reviews are invaluable!",
          author: "Ramil Pagara Laspoñas Jr.",
          role: "Fitness Enthusiast",
        },
        {
          text:
            "As a sneakerhead, I love how SoleScore keeps me updated on the latest trends and releases.",
          author: "Royd Joseph R. Pihayon",
          role: "Sneaker Collector",
        },
        {
          text:
            "The expert reviews on SoleScore have helped me make informed decisions for my running shoes.",
          author: "Winsheer S. Ponio",
          role: "Marathon Runner",
        },
      ],
    };
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-size: 0.9rem;
}
.text-center {
  text-align: center;
}
</style>
