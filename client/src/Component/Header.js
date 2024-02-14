import {useState } from 'react'
import logo from '../Component/Picture/logoSecondHandShoe.png'; // import your image
import { Dialog} from '@headlessui/react'


export default function Example() {
  return (
    <header className="bg-black">
      <div className="px-4 lg:px-8">
        <nav className="flex items-center justify-between mx-auto py-4" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#">
              <img className="h-20 w-auto" src={logo} alt="Logo" />
            </a>
          </div>
          <div>
            <a href="#" className="font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}