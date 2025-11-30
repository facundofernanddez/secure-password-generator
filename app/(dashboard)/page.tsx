import FormCreatePassword from "./_components/form-create-password";
import PasswordList from "./_components/password-list";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4">
      <FormCreatePassword />
      <PasswordList />
    </div>
  );
}
