import * as React from "react"
import Clicker from "./clicker"

export interface HomepageIndexProps {
  emails: string[],
  user: Express.User
}

function userInfo(displayName: string) {
  return (
    <p>
      Logged in as {displayName}.
    </p>
  )
}

function loginButton() {
  return (
    <p>
      <a href="/google-auth/">Log in with Google</a>
    </p>
  )
}

export default function indexView(props: HomepageIndexProps) {
  return (
    <div>
      <h1>Homepage</h1>
      { props.user ? userInfo(props.user.displayName) : loginButton()}
      <ul>
        {
          props.emails.map((email, ix) => {
            return <li key={ix}>{email}</li>
          })
        }
      </ul>
      <Clicker />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar elit sit amet aliquam venenatis. Morbi
        nisi leo, porttitor ut lectus vitae, semper porttitor leo. Nam bibendum consequat ex, id interdum enim interdum
        non. Suspendisse laoreet nibh sapien, ac laoreet mi maximus ac. Sed magna quam, tincidunt condimentum elementum
        nec, suscipit eget justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a vulputate lorem,
        hendrerit vestibulum sem. Nunc pharetra suscipit laoreet. Maecenas dui urna, interdum quis nulla at, molestie
        pharetra dolor. Proin rutrum sodales leo, luctus sollicitudin dui imperdiet nec.
      </p>
      <p>
        Cras venenatis massa id ipsum suscipit ultrices. Pellentesque elit sem, tempor et rhoncus nec, aliquam quis
        nibh. Duis nibh lectus, ultrices id ante quis, consequat eleifend mauris. Nulla efficitur nisl sit amet lacus
        lobortis congue. Sed erat leo, pretium a pharetra quis, consectetur sit amet quam. Aenean fringilla quam metus,
        quis iaculis nisi tincidunt nec. Etiam dictum porttitor sem. Praesent interdum nisl massa, vitae gravida turpis
        tempus et. Phasellus id risus eget dui blandit tincidunt et eu massa. Aenean convallis velit vitae convallis
        bibendum. Fusce auctor eros sit amet sapien efficitur, et pretium eros fringilla. Suspendisse maximus risus
        nisi, eu rutrum nunc pretium in. Aenean finibus placerat ipsum ac dapibus. Sed mattis, nunc at finibus
        elementum, turpis elit mattis augue, vel ultrices ex nibh quis orci.
      </p>
      <p>
        Nullam tempor nunc vitae mauris molestie faucibus. Curabitur efficitur nisl ac sem lobortis suscipit. Proin
        ullamcorper, est vitae sollicitudin congue, turpis orci tempor ex, ornare auctor enim diam finibus ipsum.
        Sed luctus sem sit amet arcu facilisis egestas. Donec sed arcu at metus efficitur sodales. Quisque hendrerit
        sapien in quam aliquam, faucibus ultricies odio interdum. Donec maximus ipsum a urna tincidunt efficitur. Sed
        quis mollis mi. Phasellus auctor lacinia urna, ac sodales nulla vulputate ac.
      </p>
      <p>
        Vivamus id dictum quam, at dapibus justo. Integer lobortis nisl odio, eget euismod urna gravida vel. Quisque ac
        gravida elit, nec vulputate ipsum. Phasellus condimentum interdum augue, nec luctus lectus condimentum vitae.
        In a dolor fringilla, viverra mi a, euismod sapien. Etiam sodales nibh ac leo porta, nec tempor felis elementum.
        Fusce quis elit porttitor, imperdiet mauris in, finibus orci. Donec condimentum justo dictum, hendrerit dolor
        sit amet, posuere metus. Maecenas non purus non eros volutpat lobortis. Sed eu odio non elit gravida blandit
        eget eu nunc.
      </p>
    </div>
  )
}
