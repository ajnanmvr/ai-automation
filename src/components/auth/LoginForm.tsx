"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="max-w-3xl w-full">
                <CardHeader className="text-center">

                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form>
                            <div className="grid gap-6">

                                <div className="flex flex-col gap-2">
                                    <Button variant="outline" className="w-full" type="button">Login with Google</Button>
                                    <Button variant="outline" className="w-full" type="button">Login with GitHub</Button>
                                </div>

                                <div className="grid gap-6">
                                    <FormField name="email"
                                        render={({ field }) =>
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="example@gmail.com" {...field} />
                                                </FormControl>
                                            </FormItem>}
                                    />
                                    <FormField name="password"
                                        render={({ field }) =>
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                            </FormItem>}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
