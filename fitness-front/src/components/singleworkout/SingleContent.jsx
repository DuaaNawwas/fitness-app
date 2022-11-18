import React from "react";
import workoutimg from "../../images/workoutimg.jpg";
import workoutimg2 from "../../images/workoutimg.png";
import BreadCrumb from "./BreadCrumb";

export default function SingleContent({ workoutData }) {
	const imgs = workoutData?.images?.filter((i) => !i.is_main);
	const mainImg = workoutData?.images[0];
	return (
		<section>
			<div class="relative mx-auto max-w-screen-xl px-4 py-8">
				<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
					<div class="md:sticky top-8 pt-9">
						<BreadCrumb name={workoutData?.name} />
						<strong class="mt-5 rounded-full border border-grape bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-grape">
							{workoutData?.category?.name}
						</strong>

						<div class="mt-1 flex justify-between">
							<div class="max-w-[35ch]">
								<h1 class="text-2xl font-bold">{workoutData?.name}</h1>
							</div>
						</div>

						<div class="group relative mt-4">
							<div class="block">
								<div>
									<div
										dangerouslySetInnerHTML={{
											__html: workoutData?.description,
										}}
									/>
								</div>
							</div>
						</div>

						<div class="mt-8">
							{workoutData?.equipment.length > 0 && (
								<>
									<div class="mb-1 text-sm font-medium">Equipments</div>
									<div class="flow-root">
										<div class="-m-0.5 flex flex-wrap">
											{workoutData?.equipment.map((eq, i) => {
												return (
													<div class=" p-0.5" key={i}>
														<span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-grape text-white">
															{eq.name}
														</span>
													</div>
												);
											})}
										</div>
									</div>
								</>
							)}

							<div class="mt-4">
								{workoutData?.muscles.length > 0 && (
									<>
										<div class="mb-1 text-sm font-medium">Muscles</div>

										<div class="flow-root">
											<div class="-m-0.5 flex flex-wrap">
												{workoutData?.muscles?.map((muscle, i) => {
													return (
														<div class=" p-0.5" key={i}>
															<span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-grape text-white">
																{muscle.name}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									</>
								)}
							</div>
							<div class="mt-4">
								{workoutData?.muscles.length > 0 && (
									<>
										<div class="mb-1 text-sm font-medium">
											Secondary Muscles
										</div>

										<div class="flow-root">
											<div class="-m-0.5 flex flex-wrap">
												{workoutData?.muscles_secondary?.map((muscle, i) => {
													return (
														<div class=" p-0.5" key={i}>
															<span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-grape text-white">
																{muscle.name}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									</>
								)}
							</div>
							<div className="flex flex-wrap gap-5 mt-10 ">
								{workoutData?.videos
									? workoutData.videos.map((i, x) => {
											return (
												<video
													src={i.video}
													className="w-40"
													controls
													key={x}
												></video>
											);
									  })
									: ""}
							</div>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 md:grid-cols-1">
						<img
							alt=""
							src={mainImg ? mainImg.image : workoutimg2}
							class="aspect-square w-full rounded-xl object-fit object-left"
						/>

						<div class="grid grid-cols-2 gap-4 lg:mt-4">
							{imgs?.map((workout, i) => {
								return (
									<img
										alt=""
										src={workout?.image}
										class="aspect-square w-full rounded-xl object-cover"
										key={i}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
