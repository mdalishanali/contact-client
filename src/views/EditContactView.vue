<template>
    <div class="container">
      <h1>Contact List</h1>
      <table class="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
            <td>
              <router-link :to="{ name: 'view-contact', params: { id: contact.id } }">View</router-link>
              <router-link :to="{ name: 'edit-contact', params: { id: contact.id } }">Edit</router-link>
              <button @click="deleteContact(contact.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const contacts = ref([]); // Assume you fetch contacts from API or store
  
  function deleteContact(id) {
    // Implement delete functionality
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .contact-table {
    width: 100%;
  }
  
  .contact-table th,
  .contact-table td {
    padding: 10px;
    text-align: left;
  }
  
  .contact-table th {
    background-color: #f2f2f2;
  }
  
  .contact-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  </style>
  