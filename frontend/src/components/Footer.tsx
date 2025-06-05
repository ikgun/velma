import ghIcon from '../github.svg'

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-[#141414] text-white p-4">
      <aside>
        <p className="text-sm flex flex-row">
          © {new Date().getFullYear()} Velma — Created by
          <a
            href="https://github.com/ikgun"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={ghIcon}
              alt="GitHub"
              className=" inline-flex items-baseline mb-1 ml-1 w-5 h-5 "
            />
          </a>
          <a
            href="https://github.com/ikgun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline font-semibold hover:underline"
          >
            ikgun
          </a>
        </p>
      </aside>
    </footer>
  )
}
