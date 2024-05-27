<template>
  <div class="container">
    <h1>Edit Contact</h1>

    <!-- Loader -->
    <div v-if="isLoading" class="loader"></div>

    <!-- Edit form -->
    <form v-if="!isLoading && editedContact" @submit.prevent="saveContact">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedContact.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedContact.email" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="editedContact.phone" required />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup>
import { api } from "@/utils/api";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const editedContact = ref(null);
const isLoading = ref(false);
const contactId = ref(null);

// Fetch contact data when component is mounted
onMounted(() => {
  const paramId = router.currentRoute.value.params.id;
  fetchContactDetails(paramId);
  contactId.value = paramId;
});

// Fetch contact details from API
async function fetchContactDetails(contactId) {
  isLoading.value = true;
  try {
    const response = await api.get(`/api/contacts/${contactId}`);
    editedContact.value = response.data.contact;
  } catch (error) {
    console.error("Error fetching contact details:", error);
  } finally {
    isLoading.value = false;
  }
}

// Save updated contact details
async function saveContact() {
  isLoading.value = true;
  try {
    const response = await api.put(`/api/contacts/${contactId}`, editedContact.value);
    editedContact.value = response.data.contact;
  } catch (error) {
    console.error("Error updating contact details:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 50px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
