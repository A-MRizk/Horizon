"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top row */}
      <div className="flex w-full flex-wrap md:flex-nowrap items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-75 cursor-pointer mx-auto md:mx-0"
        >
          Horizon
        </Link>

        {/* Search Bar */}
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        {/* Buttons and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full md:w-auto mt-4 md:mt-0 md:flex-row justify-between sm:justify-evenly">
          {/* My Basket, My Orders, and Profile */}
          <div className="flex flex-row items-center justify-between space-x-2 w-full sm:w-auto">
            {/* My Basket */}
            <Link
              href="/basket"
              className="flex relative justify-center items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <TrolleyIcon className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
              <span>My Basket</span>
            </Link>

            {/* My Orders */}
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex relative justify-center items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <PackageIcon className="w-6 h-6" />
                  <span>My Orders</span>
                </Link>
              </SignedIn>
            </ClerkLoaded>

            {/* Profile/User */}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </div>

          {/* Create Passkey */}
          {user?.passkeys.length === 0 && (
            <button
              onClick={createClerkPasskey}
              className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border mt-4 sm:mt-0 md:mt-0"
            >
              Create passkey
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
