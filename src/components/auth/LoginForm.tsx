"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    return (
        <Card >
            <CardHeader className="text-center">

                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form>
                    <div>
                        <Button variant="outline" type="button">Login with Google</Button>
                        <Button variant="outline" type="button">Login with GitHub</Button>
                    </div>
                    <div>
                        <FormField name="email"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <input type="email" placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                </FormItem>}
                        />
                        <FormField name="password"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                </FormItem>}
                        />
                    </div>
                </form>
            </Form>
        </Card>
    )
}
