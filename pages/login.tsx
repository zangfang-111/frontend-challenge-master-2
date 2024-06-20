import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BASE_URL, getFormValues, getJWTToken, saveAuthData } from 'lib/scopeApi';
import { scopeImageLoader } from 'helpers';
import { ScopeLogo } from 'public/assets/icons';

function Login(): JSX.Element {
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent): Promise<null> => {
    event?.preventDefault();
    const values = getFormValues(event);
    if (!values) {
      return null;
    }

    const token = await getJWTToken(values.email, values.password);
    if (token?.errorMessage) {
      setIsError(true);
      return null;
    }
    saveAuthData(token.token);
    if (router?.query?.from) {
      router.push(router.query.from as string);
    } else {
      router.push('/');
    }
    return null;
  };

  return (
    <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-stone-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-48 h-12 relative m-auto">
          <Image loader={scopeImageLoader} src={ScopeLogo} layout="fill" objectFit="cover" />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mt-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>

            <div className="mt-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            {isError && (
              <div className="flex items-center justify-between">
                <div className="text-xs text-red-500">Wrong email or password</div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={`${BASE_URL}/reset-password`}>
                  <a className="font-medium text-blue-500 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
