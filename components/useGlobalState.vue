<script>
const isLoggedIn = useState("isLoggedIn", () => {
  return !!localStorage.getItem("token");
});
</script>
