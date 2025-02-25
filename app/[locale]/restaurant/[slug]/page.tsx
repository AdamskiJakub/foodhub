import RestaurantDetails from "@/components/restaurant-page/RestaurantDetails";
import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) {
    return notFound();
  }

  return <RestaurantDetails restaurant={restaurant} />;
}
