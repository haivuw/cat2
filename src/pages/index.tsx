import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import HeroBlock from 'containers/hero-block';
import Products from 'containers/products';
import CallToAction from 'containers/call-to-action';
import HowItWorks from 'containers/how-it-works';
import { useRefScroll } from 'helpers/use-ref-scroll';
import { useSearch } from 'contexts/search/use-search';
import { getCategories } from 'helpers/get-categories';
import Categories from 'containers/categories';
import { useCategory } from 'contexts/category/use-category';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getPricesByEmail } from 'helpers/get-prices';
import useSWR from 'swr'
import { useAuth } from 'contexts/auth/provider';
import getProductsClient from 'services/getProducts';
import { getProducts } from 'helpers/get-products';
import mergeProductsPrice from 'helpers/merge-products-prices';

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

  const { user, onChange } = useAuth();
  const {data, mutate} = useSWR(user?.email, getProductsClient, {fallbackData: { data: products }})
  useEffect(() => {
    onChange(user => {
      if (!user) mutate({data: data.data.map(e => ({...e, price: null}))})
    })
  }, [])


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
      <Products items={data.data} />
      <CallToAction />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const cookie = nookies.get(ctx)

  let [products, prices, categories] = await Promise.all([
    getProducts(), getPricesByEmail(cookie.email), getCategories()
  ])

  products = mergeProductsPrice(products, prices, cookie.email)

  return {
    props: {
      products,
      categories,
    },
  };
}
