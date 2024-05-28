<template>
  <div class="container">
    <h1>Add Contact</h1>

    <!-- Loader -->
    <div v-if="isLoading" class="loader"></div>

    <!-- Add contact form -->
    <form v-if="!isLoading" @submit.prevent="saveContact">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newContact.name" required />
        <span v-if="!validations.name" class="error">Name is required</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newContact.email" required />
        <span v-if="!validations.email" class="error"
          >Invalid email format</span
        >
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="newContact.phone" required />
        <span v-if="!validations.phone" class="error"
          >Invalid phone format</span
        >
      </div>
      <button type="submit" :disabled="!isFormValid">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/utils/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const router = useRouter();
const newContact = ref({ name: "", email: "", phone: "" });
const isLoading = ref(false);

// Email validation function
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Phone validation function using libphonenumber-js
function isValidPhone(phone) {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber?.isValid() ?? false;
  } catch {
    return false;
  }
}

// Computed properties for validation state
const validations = computed(() => ({
  name: newContact.value.name.trim().length > 0,
  email: isValidEmail(newContact.value.email),
  phone: isValidPhone(newContact.value.phone),
}));

// Check if the form is valid
const isFormValid = computed(
  () =>
    validations.value.name && validations.value.email && validations.value.phone
);

// Save new contact details
async function saveContact() {
  if (!isFormValid.value) return;

  isLoading.value = true;
  try {
    await api.post(`/api/contacts`, newContact.value);
    router.push({ name: "contact-list" }); // Redirect to contact list after adding contact
  } catch (error) {
    console.error("Error adding new contact:", error);
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
