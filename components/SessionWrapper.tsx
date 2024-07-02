"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import React from "react";

const SessionWrapper = ({ children }: any) => {
	return (
		<div>
			<SessionProvider>
				<RecoilRoot>{children}</RecoilRoot>
			</SessionProvider>
		</div>
	);
};

export default SessionWrapper;
