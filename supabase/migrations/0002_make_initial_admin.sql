-- Set the initial admin (replace with your email)
update public.profiles
set is_admin = true
where email = 'YOUR_EMAIL@example.com';
