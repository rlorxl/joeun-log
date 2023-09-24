import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';

const CustomCode = (props: any) => {
  const code = props.children.props.children.trim();
  const className = props.children.props.className || '';
  const language = className.replace(/language-/, '');

  return (
    <Highlight theme={themes.dracula} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className="rounded-md p-4 text-sm mt-6 mb-6 overflow-x-scroll" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const MyH1 = (props: any) => (
  <h1 id={props.children} className="text-3xl font-semibold mb-5" {...props} />
);

const MyH2 = (props: any) => (
  <h2 id={props.children} className="text-2xl font-semibold mb-5" {...props} />
);

const MyH3 = (props: any) => (
  <h3 id={props.children} className="text-xl font-semibold mb-5" {...props} />
);

const MyParagraph = (props: any) => <p className="mb-2 leading-7" {...props} />;

const MyHr = (props: any) => <hr className="border-2 mt-6 mb-6" {...props} />;

const MyBr = (props: any) => <br className="mb-12" {...props} />;

const MyOl = (props: any) => <ol className="list-decimal pl-5 mb-6 space-y-2" {...props} />;

const MyUl = (props: any) => <ul className="list-disc pl-5 mb-6 space-y-2" {...props} />;

const MyCode = (props: any) => <code className=" bg-[#E9EAEE] rounded-md p-1 text-sm" {...props} />;

const MyPre = (props: any) => CustomCode(props);

const MyBlockquote = (props: any) => (
  <blockquote
    className="pt-[14px] pb-1 px-4 my-4 border-l-2 border-second-color bg-[#f1f1f1]"
    {...props}
  />
);

const MyATag = (props: any) => <a className="text-pink-500 my-4" {...props} />;

// navigation style
const NavHeading1 = (props: any) => (
  <Link
    href={`#${props.children}`}
    className="block cursor-pointer hover:text-second-color"
    {...props}>
    {props.children}
  </Link>
);

const NavHeading2 = (props: any) => (
  <Link
    href={`#${props.children}`}
    className="block cursor-pointer hover:text-second-color ml-4"
    {...props}>
    {props.children}
  </Link>
);

export {
  MyH1,
  MyH2,
  MyH3,
  MyParagraph,
  MyHr,
  MyBr,
  MyOl,
  MyUl,
  MyCode,
  MyPre,
  MyBlockquote,
  MyATag,
  NavHeading1,
  NavHeading2,
};