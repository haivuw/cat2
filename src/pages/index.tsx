import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import HeroBlock from 'containers/hero-block';
import Products from 'containers/products';
import CallToAction from 'containers/call-to-action';
import HowItWorks from 'containers/how-it-works';
import { useRefScroll } from 'helpers/use-ref-scroll';
import { useSearch } from 'contexts/search/use-search';
import { getProducts } from 'helpers/get-products';
import { getCategories } from 'helpers/get-categories';
import Categories from 'containers/categories';
import { useCategory } from 'contexts/category/use-category';

export default function Home({ products, categories }) {
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100,
  });
  const { searchTerm } = useSearch();
  const { category } = useCategory();
  useEffect(() => {
    if (searchTerm || category) return scroll();
  }, [searchTerm, category]);

  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Medsy</title>
      </Head>

      <HeroBlock />
      <HowItWorks />
      <Categories data={categories} ref={elRef} />
      <Products items={products} />
      <CallToAction />
    </Layout>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  const categories = await getCategories();

  return {
    props: {
      products,
      categories,
    },
  };
}
