import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue } from '@/components/ui/select'; // Changed import for Select component
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const roles = [
    { id: "designer", label: "Designer" },
    { id: "company", label: "Company" },
    { id: "sourcemanager", label: "Sourcing Manager"},
    { id: "admin", label: "Admin" }
  ];

  const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["designer", "company", "admin","sourcemanager"], {
      required_error: "Please select a role",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center w-full max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
          <Card className="w-full max-w-xl bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Create Account<br/>Craft & Stitch
              </CardTitle>
              <p className="text-sm">Join our community today!</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex-1 flex flex-col space-y-1.5">
                  <Label className="text-xs" htmlFor="email">
                    Email
                  </Label>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter Email"
                            className={
                              form.formState.errors.email
                                ? "border-red-500 border-2 bg-red-100 transition-colors duration-150 ease-in-out"
                                : "transition-all duration-150 ease-in-out"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 flex flex-col space-y-1.5">
                  <Label className="text-xs" htmlFor="password">
                    Password
                  </Label>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter Password"
                            className={
                              form.formState.errors.password
                                ? "border-red-500 border-2 bg-red-100 transition-colors duration-150 ease-in-out"
                                : "transition-all duration-150 ease-in-out"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 flex flex-col space-y-1.5">
                  <Label className="text-xs" htmlFor="confirmPassword">
                    Confirm Password
                  </Label>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            className={
                              form.formState.errors.confirmPassword
                                ? "border-red-500 border-2 bg-red-100 transition-colors duration-150 ease-in-out"
                                : "transition-all duration-150 ease-in-out"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1 flex flex-col space-y-1.5">
                  <Label className="text-xs">Select Role</Label>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Roles</SelectLabel>
                                {roles.map(role => (
                                  <SelectItem key={role.id} value={role.id}>{role.label}</SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                className="w-full text-black bg-[#FEF2E8]"
                type="submit"
                variant="default"
              >
                Create Account
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-center w-full">
                Already have an account?{' '}
                <a href="/login" className="hover:underline">
                  Sign in
                </a>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}