<script setup>  
import { required, email, min } from '@vee-validate/rules';
import { defineRule, Field, useForm } from 'vee-validate';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return 'Passwords must match';
});
const { errors } = useForm();


</script>

<template>
    <div class="test">
        <Form>
            <Field name="password" type="password" />
  <Field name="confirmation" type="password" rules="confirmed:@password" />
            <Field name="field" rules="required" />            
        </Form>
        <h2 class="tt">{{ errors }}</h2>
    </div>

</template>
<style>
.test{
    background-color: aqua;
}
.test{
color: red;
}
</style>
