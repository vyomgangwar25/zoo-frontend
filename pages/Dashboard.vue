<template>
    <div class="flex h-screen bg-gray-300">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white flex flex-col">
        <div class="p-4 text-center font-bold text-xl bg-gray-900">
          Dashboard
        </div>
        <nav class="flex-1 mt-4">
          <ul class="space-y-2">
            <li>
              <a href="#" class="block px-4 py-2 text-gray-300 hover:bg-gray-700">Home</a>
            </li>
            <li>
              <a href="/User" class="block px-4 py-2 text-gray-300 hover:bg-gray-700">Users</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-300 hover:bg-gray-700">Settings</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-300 hover:bg-gray-700">Profile</a>
            </li>
          </ul>
        </nav>
        <div class="p-4 border-t border-gray-700 text-center">
          <a href="#" class="text-gray-300 hover:bg-gray-700">Logout</a>
        </div>
      </aside>
  
      <main class="flex-1 p-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        </div>
        <div class="flex justify-center">
          <!-- <button
            @click="removeToken"
            type="submit"
            class="px-6 mx-auto py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Token_chk
          </button> -->
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const router = useRouter();
  const removeToken = async () => {
    const token = localStorage.getItem('SavedToken');
    console.log("token from frontend  ", token);
  
    if (token) {
      try {
        const response = await fetch('http://localhost:8080/validate_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
  
        if (!response.ok) {
          alert('Failed to send token to backend');
          router.push("/ErrorPage")
        }
  
        if(response.status==200)
        {
            alert("user verification done welcome to Dashboard page")
            router.push("/Dashboard");
        }
      } catch (err) {
        console.log("in err block", err);
      }
    } else {
      alert('No token found in localStorage');
      router.push("/ErrorPage")
    }
  };
  
  onMounted(() => {
    removeToken();  
  });
  </script>
  