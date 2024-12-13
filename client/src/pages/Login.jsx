import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage, FormItem } from '@/components/ui/form';

export default function Login() {

  const formSchema = z.object({
    email: z.string().email(3,"Email is required"),
    password: z.string("Password is required"),
    role: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", role: "" },
  });


  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="!w-full !h-full"
      >
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign in to <br/> Craft & Stich</CardTitle>
          <p className="text-sm">Welcome back! Please sign in to continue</p>
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
                            : " transition-all duration-150 ease-in-out"
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
                        placeholder="Enter Password"
                        className={
                          form.formState.errors.password
                            ? "border-red-500 border-2 bg-red-100 transition-colors duration-150 ease-in-out"
                            : " transition-all duration-150 ease-in-out"
                        }
                        {...field}
                      />
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
            Sign In
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Dont have an account?{' '}
            <a href="/register" className="hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
      </form>
      </Form>
    </div>
  );
}
